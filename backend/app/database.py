from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Get MongoDB URL
MONGO_URL = os.getenv("MONGO_URL")

# Connect MongoDB
client = MongoClient(MONGO_URL)

# Create database
db = client["hr_resume_analyzer"]

print("MongoDB Connected Successfully")