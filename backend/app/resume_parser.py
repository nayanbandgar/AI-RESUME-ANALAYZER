
import fitz  # PyMuPDF
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
def parse_resume(text, hr_skills):


    doc = nlp(text)

    name = ""

    for ent in doc.ents:

        if ent.label_ == "PERSON":

            name = ent.text

            break

    email = ""

    email_match = re.search(

        r'[\w\.-]+@[\w\.-]+',

        text

    )

    if email_match:

        email = email_match.group()

    found_skills = []

    lower_text = text.lower()

    for skill in hr_skills:

        if skill.lower() in lower_text:

            found_skills.append(skill)

    return {

        "candidate_name": name,

        "email": email,

        "skills": found_skills,

        "resume_text": text

    }