from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def calculate_score(

    resume_text,

    job_description

):

    resume_embedding = model.encode(
        [resume_text]
    )

    jd_embedding = model.encode(
        [job_description]
    )

    score = cosine_similarity(

        resume_embedding,

        jd_embedding

    )[0][0]

    return float(round(score * 100, 2))
# from sentence_transformers import SentenceTransformer
# from sklearn.metrics.pairwise import cosine_similarity
# from pymongo import MongoClient

# # Load model
# model = SentenceTransformer("all-MiniLM-L6-v2")

# # Connect to MongoDB
# client = MongoClient("mongodb+srv://hrresumes_db_user:khushi14@cluster0.6lahgnr.mongodb.net/HR_resume_analyzer?retryWrites=true&w=majority&appName=Cluster0")  # adjust URI if needed
# db = client["HR_resume_analyzer"]

# resumes_collection = db["resumes"]
# jobs_collection = db["jobs"]

# # Function to calculate similarity score
# def calculate_score(resume_text, job_description):
#     resume_embedding = model.encode([resume_text])
#     jd_embedding = model.encode([job_description])
#     score = cosine_similarity(resume_embedding, jd_embedding)[0][0]
#     return round(score * 100, 2)

# # Match resumes to a given job
# def match_resumes_to_job(job_id):
#     # Fetch job description
#     job = jobs_collection.find_one({"_id": job_id})
#     job_description = job["description"]

#     # Fetch all resumes
#     resumes = resumes_collection.find()

#     results = []
#     for resume in resumes:
#         score = calculate_score(resume["text"], job_description)
#         results.append({
#             "resume_id": resume["_id"],
#             "candidate_name": resume.get("name", "Unknown"),
#             "score": score
#         })

#     # Sort by score (highest first)
#     results.sort(key=lambda x: x["score"], reverse=True)
#     return results

# # Example usage
# job_id = "some_job_id_here"  # replace with actual ObjectId
# matches = match_resumes_to_job(job_id)

# for match in matches:
#     print(f"Candidate: {match['candidate_name']} | Score: {match['score']}%")
