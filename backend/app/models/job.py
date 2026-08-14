from sqlalchemy import Column, DateTime, Integer, String, Text, func

from app.database.database import Base


class JobPosting(Base):
    __tablename__ = "job_postings"

    id = Column(Integer, primary_key=True, index=True)
    recruiter_user_id = Column(Integer, nullable=True, index=True)
    company_name = Column(String(100), nullable=False)
    address = Column(String(200), nullable=False)
    title = Column(String(100), nullable=False, index=True)
    requirements = Column(Text, nullable=False)
    benefits = Column(Text, nullable=False)
    duration_days = Column(Integer, nullable=False)
    status = Column(String(20), nullable=False, default="pending", index=True)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    reviewed_at = Column(DateTime, nullable=True)
