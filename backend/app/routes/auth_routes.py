from bson import ObjectId
from fastapi import APIRouter
from app.database import db
from fastapi import UploadFile, File, HTTPException
from typing import List
from app.resume_parser import extract_text, parse_resume
from datetime import datetime
import uuid
from email.mime.text import MIMEText
from fastapi import Body
from app.utils.matcher import calculate_score
from fastapi.responses import FileResponse
import uuid
from bson import ObjectId
import dotenv
import os
import random
import smtplib
import bcrypt
import shutil
from app.resume_parser import extract_text

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


dotenv.load_dotenv()

router = APIRouter()
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")


# ===================================
# LOGIN
# ===================================
@router.post("/login")
async def login(data: dict):

    email = data.get("email")
    password = data.get("password")

    user = db.users.find_one({"email": email})

    if not user:
        return {"success": False, "message": "User not found"}

    if user["password"] != password:
        return {"success": False, "message": "Wrong password"}
#     db.resumes.insert_one({
#     "user_id": current_user["_id"],
#     "candidate_name": name,
#     "email": email
# })

    return {"success": True, "message": "Login Successful"}


# ===================================
# SIGNUP
# ===================================
@router.post("/signup")
async def signup(data: dict):

    print(data)

#     db.resumes.insert_one({
#     "user_id": current_user["_id"],
#     "candidate_name": name,
#     "email": email
# })

    return {"message": "Signup Successful"}


# ===================================
# UPLOADRESUMES
# ===================================

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    print("API CALLED")

    unique_name = str(uuid.uuid4()) + "_" + file.filename

    file_path = f"uploads/{unique_name}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("FILE SAVED")

    # Extract text
    extracted_text = extract_text(file_path)

    print("TEXT EXTRACTED")

    # Parse resume   
    parsed_data = parse_resume(extracted_text)

    print("PARSED DATA =", parsed_data)

    # Save in MongoDB
    parsed_data = parse_resume(extracted_text)

    inserted = db.resumes.insert_one(
    {
        "filename": file.filename,
        "path": file_path,
        "resume_text": extracted_text,
        "candidate_name": parsed_data.get("candidate_name", ""),
        "candidate_email": parsed_data.get("email", ""),
        "skills": parsed_data.get("skills", []),
        "uploaded_at": datetime.now()
    }
)

    return {
        "message": "Resume Uploaded Successfully",
        "candidate_name": parsed_data.get("candidate_name"),
        "email": parsed_data.get("email"),
        "resume_id": str(inserted.inserted_id)
    }


# ===================================
# analyeze resumes
# ===================================


@router.post("/analyze")
async def analyze(data: dict):

    analysis_id = str(uuid.uuid4())

    jd = data["job_description"]

    resume_ids = data["resume_ids"]

    resumes = list(
        db.resumes.find(
            {
                "_id": {
                    "$in": [
                        ObjectId(id)
                        for id in resume_ids
                    ]
                }
            }
        )
    )

    results = []

    for resume in resumes:

        score = calculate_score(
            resume["resume_text"],
            jd
        )

        result = {
            "candidate_name": resume.get("candidate_name", "Unknown"),
            "email": resume.get("candidate_email", ""),
            "path": resume.get("path", ""),
            
            "skills": resume.get("skills", []),
            "score": round(float(score), 2),
            "experience": "Fresher",
            "strengths": [],
            "weaknesses": [],
            "ai_summary": f"Resume matches the job description by {score}%"
        }

        results.append(result)
        db.resumeHistory.insert_one({
        "analysis_id": analysis_id,
        "candidate_name": result["candidate_name"],
        "email": result["email"],
        "skills": result["skills"],
        "score": round(float(result["score"]), 2),
        "experience": result["experience"],
        "strengths": result["strengths"],
        "weaknesses": result["weaknesses"],
        "ai_summary": result["ai_summary"],
        "job_description": jd,
        
        "uploaded_at": datetime.utcnow()
    })

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return {
        "results": results
    }

@router.post("/save-job")
async def save_job(data: dict):

    db.jobs.insert_one(
        {
            "job_title": data["job_title"],
            "job_description": data["job_description"],
            "required_skills": data["required_skills"],
            "experience": data["experience"],
        }
    )

    return {"message": "Stored"}


@router.get("/get-roles")
async def get_roles():

    jobs = list(db.jobs.find({}, {"_id": 0, "job_title": 1}))

    roles = [job["job_title"] for job in jobs if "job_title" in job]

    return {"roles": list(set(roles))}



# @router.get("/resume-history")
# async def get_resume_history():

#     history = list(db.resumeHistory.find().sort("analyzed_at", -1))

#     for item in history:
#         item["_id"] = str(item["_id"])

#     return {"history": history}

@router.get("/candidates")
async def get_candidates():

    candidates = list(
        db.resumes.find(
            {},
            {
                "_id": 0
            }
        ).sort("uploaded_at", -1)
    )

    return {
        "candidates": candidates
    }
#counting total resumes for dashboard stats
@router.get("/dashboard-stats")
async def dashboard_stats():

    total_resumes = db.resumes.count_documents({})

    total_analysis = db.resumeHistory.count_documents({})

    return {
        "total_resumes": total_resumes,
        "total_analysis": total_analysis
    }
#top candidate based on score for a specific job description
@router.get("/top-candidates")
async def top_candidates():

    candidates = list(
        db.resumeHistory.find(
            {},
            {"_id": 0,
             }
            
        )
        .sort("score", -1)
        .limit(5)
    )
    

    return {
        "candidates": candidates
    }
# list of recently uploaded resumes for dashboard
@router.get("/recent-resumes")
async def recent_resumes():

    resumes = list(
        db.resumes.find(
            {},
            {
                "_id": 0,
                "candidate_name": 1,
                "candidate_email": 1,
                "uploaded_at": 1
            }
        )
        .sort("uploaded_at", -1)
        .limit(3)
    )

    return {
        "resumes": resumes
    }

# @router.get("/view-resume/{email}")
# async def view_resume(email: str):

#     resume = db.resumes.find_one({
#         "candidate_email": email
#     })

#     if not resume:
#         return {"message": "Resume not found"}

#     return FileResponse(
#         resume["path"],
#         media_type="application/pdf"
#     )


@router.get("/view-resume/{email}")
async def view_resume(email: str):

    resume = db.resumes.find_one({
        "candidate_email": email
    })

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    file_path = resume.get("path")

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail=f"File not found: {file_path}"
        )

    return FileResponse(
    resume["path"],
    media_type="application/pdf"
)