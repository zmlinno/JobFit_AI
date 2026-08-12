from fastapi import APIRouter,HTTPException
from pydantic import BaseModel

from app.database.database import get_db
from app.models.user import User
from app.schemas.auth import RegisterRequest
from sqlalchemy import select
#创建一个路由对象
router = APIRouter()





#暂时模拟数据库中的用户
FAKE_USER = 
{
    "id" : 1,
    "email":"test@example.com",
    "password":"123456",
    "name":"测试用户"
}


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

        return{
            "message":"账号已经注册"
        }
