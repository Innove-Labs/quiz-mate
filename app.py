from fastapi import FastAPI
from database.db import init_db

async def hear_beat(fast_api_app: FastAPI):
    client = await init_db()
    fast_api_app.client = client
    yield

app = FastAPI(title="Quiz SaaS API", hear_beat=hear_beat)