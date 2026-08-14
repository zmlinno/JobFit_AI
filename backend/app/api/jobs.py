from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.job import JobPosting
from app.models.user import User
from app.schemas.job import JobCreateRequest, JobResponse, JobReviewRequest


router = APIRouter()


@router.post("", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def create_job(job_data: JobCreateRequest, db: Session = Depends(get_db)):
    recruiter = db.get(User, job_data.recruiter_user_id)

    if recruiter is None:
        raise HTTPException(status_code=404, detail="发布账号不存在，请重新登录")

    if recruiter.role != "recruiter":
        raise HTTPException(status_code=403, detail="您不是招聘者，无法发布招聘信息")

    job = JobPosting(**job_data.model_dump(), status="pending")
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@router.get("", response_model=list[JobResponse])
def get_approved_jobs(db: Session = Depends(get_db)):
    statement = (
        select(JobPosting)
        .where(JobPosting.status == "approved")
        .order_by(JobPosting.created_at.desc())
    )
    return db.execute(statement).scalars().all()


@router.get("/pending", response_model=list[JobResponse])
def get_pending_jobs(db: Session = Depends(get_db)):
    statement = (
        select(JobPosting)
        .where(JobPosting.status == "pending")
        .order_by(JobPosting.created_at.asc())
    )
    return db.execute(statement).scalars().all()


@router.get("/mine/{user_id}", response_model=list[JobResponse])
def get_user_jobs(user_id: int, db: Session = Depends(get_db)):
    statement = (
        select(JobPosting)
        .where(JobPosting.recruiter_user_id == user_id)
        .order_by(JobPosting.created_at.desc())
    )
    return db.execute(statement).scalars().all()


@router.patch("/{job_id}/review", response_model=JobResponse)
def review_job(
    job_id: int,
    review_data: JobReviewRequest,
    db: Session = Depends(get_db),
):
    job = db.get(JobPosting, job_id)

    if job is None:
        raise HTTPException(status_code=404, detail="招聘公告不存在")

    if job.status != "pending":
        raise HTTPException(status_code=409, detail="该招聘公告已经审核")

    job.status = review_data.decision
    job.reviewed_at = datetime.now()
    db.commit()
    db.refresh(job)
    return job
