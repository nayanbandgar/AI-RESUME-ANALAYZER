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

    

    