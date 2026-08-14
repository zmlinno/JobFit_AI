from fastapi import APIRouter,HTTPException,Depends
from sqlalchemy.orm import Session

from pydantic import BaseModel

from app.database.database import get_db
from app.models.user import User
from app.schemas.auth import RegisterRequest
from sqlalchemy import select
from app.core.security import hash_password
from app.schemas.auth import LoginRequest

#创建一个路由对象
router = APIRouter()



#登陆接口
@router.post("/login")
def login(login_data:LoginRequest):

    #判断邮箱是否正确
    if login_data.email != FAKE_USER["email"]:
        raise HTTPException(
            status_code = 401,
            detail="账号密码错误"
        )

    if login_data.password != FAKE_USER["password"]:
        raise HTTPException(
            status_code = 401,
            detail = "账号或密码错误"
        )


    #登陆成功后返回用户信息
    return{
        "message":"登陆成功",
        "user":{
            "id":FAKE_USER["id"],
            "email":FAKE_USER["email"],
            "name":FAKE_USER["name"]
        }
    }


#注册接口
router = APIRouter()


@router.post("/register")
def register(
    register_data: RegisterRequest,
    db: Session = Depends(get_db)
):

    stmt = select(User).where(
        User.username == register_data.username
    )
    existing_user = db.execute(stmt).scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code = 409,
            detail = "账号已经存在"
        )
    

    #检查邮箱是否重复
    email_stmt = select(User).where(
        User.email == register_data.email
    )
    existing_email = db.execute(email_stmt).scalar_one_or_none()
    if existing_email:
        raise HTTPException(
            status_code = 409,
            detail = "邮箱已经存在"
        )


    #密码哈希
    hashed_password = hash_password(
        register_data.password
    )

    #创建用户
    new_user = User(
        username = register_data.username,
        email = register_data.email,
        password_hash = hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "注册成功",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email
        }
    }
