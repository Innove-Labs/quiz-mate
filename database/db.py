import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from .models import User, Quiz
from config import MONGO_URI, DB_NAME

load_dotenv()

# Initialize Beanie
async def init_db():
    print("Starting database")
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    await init_beanie(database=db, document_models=[User, Quiz])
    print("Database started")
    return client