from fastapi import APIRouter
from .auth import router as auth_router
from .grade import router as grade_router
from .subject import router as subject_router

router = APIRouter()

router.include_router(auth_router, prefix="/auth", tags=["auth", "user"])
router.include_router(grade_router, prefix="/grade", tags=["grade"])
router.include_router(subject_router, prefix="/subject", tags=["subject"])