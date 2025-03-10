from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class UserCreate(BaseModel):
    name: str
    email: str
    user_name: str
    password: str
    role: str

class UserLogin(BaseModel):
    email: str
    password: str

class GetUserResponse(BaseModel):
    name: str
    email: str
    user_name: str
    role: str