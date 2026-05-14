from fastapi import FastAPI
from app.database import db
from app.routes.auth_routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(auth_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    
    return {"message": "Backend Running"}

@app.get("/test-db")
def test_db():

    db.test.insert_one({
        "name": "Khushi"
    })


    return {"message": "Inserted"}