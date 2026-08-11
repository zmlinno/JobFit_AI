# 先定义注册数据的时候，我们需要 账号，密码，手机号，邮箱


from pydantic import BaseModel


#定义前端需要传过来的数据格式
class LoginRequest(BaseModel):
    email:str
    password:str



#这段代码的意思是前端如果要注册这个用户
#必须按照这个格式把数据发送
class RegisterRequest(BaseModel):
    username:str
    password:str
    email:str
    phone:str


