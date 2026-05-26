from fastapi import APIRouter
from app.database import db
from fastapi import UploadFile, File, HTTPException
from typing import List
from app.resume_parser import extract_text,parse_resume
from datetime import datetime
import uuid
from email.mime.text import MIMEText
from fastapi import Body
from app.utils.matcher import calculate_score

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

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("FILE SAVED")

    extracted_text = extract_text(
        file_path,
        
    )

    parsed_data = parse_resume(
        file_path,
        file.filename
    )

    db.resumes.insert_one({
        "filename": file.filename,
        "path": file_path,
        "resume_text": extracted_text,

        "candidate_name":
        parsed_data.get(
            "name",
            "Unknown"
        ),

        "candidate_email":
        parsed_data.get(
            "email",
            ""
        ),

        "skills":
        parsed_data.get(
            "skills",
            []
        )
    })

    print("DATA INSERTED")

    return {
        "message":
        "Resume Uploaded Successfully"
    }


# ===================================
# analyeze resumes
# ===================================
@router.post("/analyze")
async def analyze(data: dict):

    jd = data["job_description"]

    jd_words = set(jd.lower().split())

    resumes = list(db.resumes.find())

    results = []

    for resume in resumes:

        resume_words = set(resume["resume_text"].lower().split())

        matched = jd_words.intersection(resume_words)

        score = (len(matched) / len(jd_words)) * 100

        results.append(
            {
                "filename": resume["filename"],
                "score": round(score, 2),
                "matched": list(matched),
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
