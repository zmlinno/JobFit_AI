from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class JobCreateRequest(BaseModel):
    recruiter_user_id: int = Field(ge=1)
    company_name: str = Field(min_length=1, max_length=100)
    address: str = Field(min_length=1, max_length=200)
    title: str = Field(min_length=1, max_length=100)
    requirements: str = Field(min_length=1)
    benefits: str = Field(min_length=1)
    duration_days: int = Field(ge=1, le=3650)


class JobReviewRequest(BaseModel):
    decision: Literal["approved", "rejected"]


class JobResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    recruiter_user_id: int | None
    company_name: str
    address: str
    title: str
    requirements: str
    benefits: str
    duration_days: int
    status: str
    created_at: datetime
    reviewed_at: datetime | None
