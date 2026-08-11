from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base
from sqlalchemy import text

DATABASE_URL = (
    "mysql+pymysql://fastapi_user:123456@localhost:3306/test01"
)


engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit = False,
    autorflush = False,
    bind = engine
)

#这个代码的意思是创建ORM基础类
Base = declarative_base()




def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()