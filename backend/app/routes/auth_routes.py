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

    user = db.users.find_one({
        "email": email
    })

    if not user:
        return {
            "message": "User not found"
        }

    if user["password"] != password:
        return {
            "message": "Wrong password"
        }

    return {
        "message": "Login Successful"
    }




# ===================================
# SIGNUP
# ===================================
@router.post("/signup")
async def signup(data: dict):

    print(data)

    db.users.insert_one(data)

    return {
        "message": "Signup Successful"
    }

    

    