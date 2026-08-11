from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.models.user import User
from app.database.database import Base,engine


app = FastAPI()


Base.metadata.create_all(bind = engine)

#允许前端访问后端

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


#规定前端发送的数据格式
class LoginData(BaseModel):
    username:str
    password:str

#创建登陆接口
#这里表示后端创建了一个地址
#专门接收前端发送的登陆请求
@app.post("/login")
def login(data:LoginData):

    print("前端发送的账号: ",data.username)
    print("前端发送的密码: ",data.password)

    return{
        "message": "登陆成功"
    }