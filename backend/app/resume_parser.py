

import fitz
import re
import spacy

nlp = spacy.load("en_core_web_sm")

def extract_text(file_path):

    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:
        text += page.get_text()

    pdf.close()

    return text


def parse_resume(text):

    lines = [
        line.strip()
        for line in text.split("\n")
        if line.strip()
    ]

    name = ""

    # First non-empty line ko name maan lo
    if lines:
        name = lines[0]

    email = ""

    email_match = re.search(
        r'[\w\.-]+@[\w\.-]+',
        text
    )

    if email_match:
        email = email_match.group()

    return {
        "candidate_name": name,
        "email": email,
        "resume_text": text,
        "skills": []
    }