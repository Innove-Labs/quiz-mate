from array import ArrayType

from beanie import Document, Link, Indexed
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# ----------------- User Schema (Teachers & Students) -----------------
class User(Document):
    name: str
    email: Indexed(str, unique=True)
    password_hash: str
    user_name: Indexed(str, unique=True)
    role: str
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()

    class Settings:
        collection = "users"

# ----------------- Subject Schema -----------------
class Subject(Document):
    name: str
    teacher: Link[User]
    created_at: datetime = datetime.utcnow()
    description: Optional[str]
    updated_at: datetime = datetime.utcnow()

    class Settings:
        collection = "subjects"

# ----------------- Class Schema -----------------
class Grade(Document):
    name: str
    teacher: Link[User]
    created_at: datetime = datetime.utcnow()
    description: Optional[str]
    updated_at: datetime = datetime.utcnow()

    class Settings:
        collection = "classes"

# ----------------- Study Material Schema -----------------
class StudyMaterial(Document):
    teacher: Link[User]
    grade: Optional[Link[Grade]]  # Class reference
    subject: Optional[Link[Subject]]  # Subject reference
    name: str
    description: Optional[str]
    file_name: str
    file_type: str  # "pdf", "txt", etc.
    content: object  # Extracted text from the document
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()

    class Settings:
        collection = "study_materials"

# ----------------- Quiz Schema -----------------
class QuizQuestion(BaseModel):
    question: str
    options: Optional[List[str]]
    correct_answer: Optional[str]
    marks: Optional[int]

class Quiz(Document):
    quiz_id: str  # UUID for unique quiz tracking
    teacher: Link[User]
    grade: Optional[Link[Grade]]
    subject: Optional[Link[Subject]]
    study_materials: List[Link[StudyMaterial]]  # Link to study material
    title: str
    description: Optional[str]
    questions: List[QuizQuestion]  # List of questions
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()

    class Settings:
        collection = "quizzes"

