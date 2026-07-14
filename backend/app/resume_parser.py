import fitz
import re
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("all-MiniLM-L6-v2")
import fitz

def extract_text(file_path):
    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:
        text += page.get_text()

    pdf.close()

    return text

ROLE_PATTERNS = [
    "software developer",
    "software engineer",
    "frontend developer",
    "backend developer",
    "full stack developer",
    "python developer",
    "data scientist",
    "machine learning engineer",
    "data analyst",
    "web developer",
    "data analyst"
]

def extract_role(text):
    text_lower = text.lower()

    for role in ROLE_PATTERNS:
        if role in text_lower:
            return role.title()

    return "Unknown"



def extract_skills(text):
    match = re.search(
        r"skills[:\s]*(.*?)(education|experience|projects|$)",
        text,
        re.IGNORECASE | re.DOTALL
    )

    if not match:
        return []

    skills_text = match.group(1)

    return [
        skill.strip()
        for skill in re.split(r",|\n|\|", skills_text)
        if skill.strip()
    ]
def extract_experience(text):
    text_lower = text.lower()

    # Example: "3 years", "2+ years", "5 yrs"
    match = re.search(
        r'(\d+)\+?\s*(years|year|yrs|yr)',
        text_lower
    )

    if match:
        return f"{match.group(1)} Years"

    return "Fresher"

def parse_resume(text):
    lines = [
        line.strip()
        for line in text.split("\n")
        if line.strip()
    ]

    name = lines[0] if lines else ""

    email_match = re.search(
        r'[\w\.-]+@[\w\.-]+',
        text
    )

    email = email_match.group() if email_match else ""
   
    role = extract_role(text)
    skills = extract_skills(text)
    experience=extract_experience(text)
    return {
        "candidate_name": name,
        "email": email,
        "role": role,
        "resume_text": text,
        "skills": skills,
        "experience": experience,
    }




