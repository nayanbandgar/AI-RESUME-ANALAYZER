from fastapi import APIRouter
from app.database import db

from dotenv import load_dotenv
import os
import random
import smtplib
import bcrypt

from email.mime.text import MIMEText

load_dotenv()

router = APIRouter()
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")


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

    from fastapi import UploadFile, File


import shutil


from fastapi import UploadFile, File
import shutil


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    # save file in uploads folder
    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(file.file, buffer)

    # save details in MongoDB
    db.resumes.insert_one({

        "filename": file.filename,

        "path": file_path

    })

    return {

        "message": "Resume Uploaded Successfully"

    }