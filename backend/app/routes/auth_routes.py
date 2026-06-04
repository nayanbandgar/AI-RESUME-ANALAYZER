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
import uuid

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

    return {"success": True, "message": "Login Successful"}


# ===================================
# SIGNUP
# ===================================
@router.post("/signup")
async def signup(data: dict):

    print(data)

    db.users.insert_one(data)

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
    db.resumes.insert_one(
        {
            "filename": file.filename,
            "path": file_path,
            "resume_text": extracted_text,
            "candidate_name": parsed_data.get("candidate_name", ""),
            "candidate_email": parsed_data.get("email", ""),
            "skills": parsed_data.get("skills", []),
        }
    )

    print("DATA INSERTED")

    return {
        "message": "Resume Uploaded Successfully",
        "candidate_name": parsed_data.get("candidate_name"),
        "email": parsed_data.get("email"),
    }


# ===================================
# analyeze resumes
# ===================================


@router.post("/analyze")
async def analyze(data: dict):

    analysis_id = str(uuid.uuid4())

    jd = data["job_description"]

    resumes = list(db.resumes.find())

    results = []

    for resume in resumes:

        score = calculate_score(resume["resume_text"], jd)

        result = {
            "candidate_name": resume.get("candidate_name", "Unknown"),
            "email": resume.get("candidate_email", ""),
            "skills": resume.get("skills", []),
            "score": float(score),
            "experience": "Fresher",
            "strengths": [],
            "weaknesses": [],
            "ai_summary": f"Resume matches the job description by {score}%",
        }

        results.append(result)

        # History Save
        db.resumeHistory.insert_one(
            {
                "analysis_id": analysis_id,
                "candidate_name": result["candidate_name"],
                "email": result["email"],
                "skills": result["skills"],
                "score": result["score"],
                "job_description": jd,
                "analyzed_at": datetime.utcnow(),
            }
        )

    results.sort(key=lambda x: x["score"], reverse=True)

    return {"results": results}


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


@router.get("/history")
async def get_history():

    history = list(db.history.find())

    for item in history:
        item["_id"] = str(item["_id"])

    return {"history": history}


@router.get("/resume-history")
async def get_resume_history():

    history = list(db.resumeHistory.find().sort("analyzed_at", -1))

    for item in history:
        item["_id"] = str(item["_id"])

    return {"history": history}
