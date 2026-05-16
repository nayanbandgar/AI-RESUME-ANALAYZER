from fastapi import APIRouter
from app.database import db
from fastapi import UploadFile, File ,HTTPException
from typing import List
from app.resume_parser import parse_resume
from datetime import datetime
import uuid
from email.mime.text import MIMEText
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

    db.resumes.insert_one({

        "filename": file.filename,

        "path": file_path

    })

    print("DATA INSERTED")

    return {
        "message": "Resume Uploaded Successfully"
    }
@router.post("/upload-resumes")
async def upload_resumes(files: List[UploadFile] = File(...)):
    """
    Upload multiple resumes at once
    
    - Accepts multiple PDF, DOC, DOCX files
    - Extracts text from each
    - Saves all to MongoDB
    - Returns list of resume IDs
    """
    uploaded = []
    resume_ids = []
    
    try:
        for file in files:
            try:
                # Validate file extension
                file_ext = file.filename.split(".")[-1].lower()
                if file_ext not in ["pdf", "doc", "docx"]:
                    continue
                
                # Generate unique filename
                unique_filename = f"{uuid.uuid4().hex}.{file_ext}"
                file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
                
                # Save file
                with open(file_path, "wb") as buffer:
                    shutil.copyfileobj(file.file, buffer)
                
                # Extract text
                extracted_text = extract_text(file_path, file.filename)
                
                if not extracted_text:
                    os.remove(file_path)
                    continue
                
                # Parse resume
                parsed_data = parse_resume(file_path, file.filename)
                
                # Save to MongoDB
                resume_doc = {
                    "filename": file.filename,
                    "stored_filename": unique_filename,
                    "path": file_path,
                    "resume_text": extracted_text,
                    "candidate_email": parsed_data.get("email", ""),
                    "candidate_name": parsed_data.get("name", "Unknown"),
                    "skills": parsed_data.get("skills", []),
                    "experience_years": parsed_data.get("experience_years", 0),
                    "education": parsed_data.get("education", []),
                    "parsed_data": parsed_data,
                    "uploaded_at": datetime.utcnow()
                }
                
                result = db.resumes.insert_one(resume_doc)
                
                uploaded.append({
                    "resume_id": str(result.inserted_id),
                    "filename": file.filename,
                    "name": parsed_data.get("name", "Unknown"),
                    "email": parsed_data.get("email", "")
                })
                resume_ids.append(str(result.inserted_id))
                
            except Exception as e:
                print(f"Error uploading {file.filename}: {e}")
                continue
        
        return {
            "message": f"{len(uploaded)} resumes uploaded successfully",
            "uploaded": uploaded,
            "resume_ids": resume_ids,
            "count": len(uploaded)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))