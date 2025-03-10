from fastapi import APIRouter, HTTPException, Depends
from schemas.auth_schema import Token, UserCreate, UserLogin, GetUserResponse
from utils.auth_utils import hash_password, create_access_token, verify_password, get_current_user
from database.models import User
from datetime import datetime

router = APIRouter()


@router.post("/signup", response_model=Token)
async def signup(user_data: UserCreate):
    existing_user = await User.find_one(User.email == user_data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        name=user_data.name,
        email=user_data.email,
        user_name=user_data.user_name,
        password_hash=hash_password(user_data.password),
        role=user_data.role,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    created_user = await User.insert(user)

    access_token = create_access_token({"sub": str(created_user.id)})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=Token)
async def login(user_data: UserLogin):
    user = await User.find_one(User.email == user_data.email)
    if not user or not verify_password(user_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = create_access_token({"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=GetUserResponse)
async def get_logged_user(current_user: User = Depends(get_current_user)):
    return current_user
