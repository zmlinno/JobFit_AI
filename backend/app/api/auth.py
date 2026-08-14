from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import hash_password, verify_password
from app.database.database import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest


router = APIRouter()


@router.post("/login")
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    statement = select(User).where(User.email == login_data.email)
    user = db.execute(statement).scalar_one_or_none()

    if user is None or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="账号或密码错误")

    return {
        "message": "登录成功",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
        },
    }


@router.post("/register")
def register(
    register_data: RegisterRequest,
    db: Session = Depends(get_db),
):
    username_statement = select(User).where(User.username == register_data.username)
    existing_user = db.execute(username_statement).scalar_one_or_none()

    if existing_user:
        raise HTTPException(status_code=409, detail="账号已经存在")

    email_statement = select(User).where(User.email == register_data.email)
    existing_email = db.execute(email_statement).scalar_one_or_none()

    if existing_email:
        raise HTTPException(status_code=409, detail="邮箱已经存在")

    new_user = User(
        username=register_data.username,
        email=register_data.email,
        password_hash=hash_password(register_data.password),
        role=register_data.role,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "注册成功",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            "role": new_user.role,
        },
    }
