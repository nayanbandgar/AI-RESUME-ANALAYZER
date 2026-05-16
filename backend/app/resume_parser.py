import fitz
from docx import Document


def extract_text(file_path):

    text = ""

    # PDF
    if file_path.endswith(".pdf"):

        pdf = fitz.open(file_path)

        for page in pdf:

            text += page.get_text()

    # DOCX
    elif file_path.endswith(".docx"):

        doc = Document(file_path)

        for para in doc.paragraphs:

            text += para.text + "\n"

    return text