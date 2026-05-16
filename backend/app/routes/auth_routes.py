from fastapi import APIRouter
from app.database import db
from fastapi import UploadFile, File
from email.mime.text import MIMEText
import dotenv
import os
import random
import smtplib
import bcrypt
import shutil
from app.resume_parser import extract_text


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
@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(file.file, buffer)

    # extract resume text
    extracted_text = extract_text(file_path)

    # save in MongoDB
    db.resumes.insert_one({

        "filename": file.filename,

        "path": file_path,

        "resume_text": extracted_text

    })

    return {
        "message": "Resume Uploaded Successfully"
    }