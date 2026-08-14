from pwdlib import PasswordHash

#专门负责密码
#哈希加密
password_hash = PasswordHash.recommended()

def hash_password(password:str)->str:
    return password_hash.hash(password)


#登陆的时候，要验证密码
def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:
    return password_manager.verify(
        plain_password,
        hashed_password
    )