from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db import init_db
from controllers import router

@asynccontextmanager
async def life_span(fast_api_app: FastAPI):
    client = await init_db()
    fast_api_app.client = client
    yield

app = FastAPI(title="Quiz SaaS API", lifespan=life_span)

origins = [
    "http://localhost:3000",  # For local development
    "https://yourfrontend.com",  # Replace with your frontend domain
    "http://localhost:8080",  # Another local domain example
    "http://localhost:5173"
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specific origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Allowed methods
    allow_headers=["*"],  # Allowed headers
)

@app.get("/api/live")
def live():
    return "Server is live"

app.include_router(router, prefix="/api", tags=["root"])