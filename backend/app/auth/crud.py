from app.auth.schemas import (
    UserCreate,
    UserLoginSchema,
)
from fastapi.encoders import jsonable_encoder
from app.models import BlackListedTokens, User

from app.utils.constants import ACCESS_TOKEN_EXPIRE_MINUTES
from app.utils.crypt_util import get_password_hash, verify_password
from app.utils.jwt_util import create_access_token, timedelta

from app.users.schemas import UserObjectSchema


async def create_user(user: UserCreate):
    user = await User(**dict(user)).save()
    return user


async def find_existed_user(email: str):
    users = await User.find(User.email == email).all()
    if users:
        return users[0]
    return None


async def find_existed_user_pk(user_pk: str):
    users = await User.find(User.pk == user_pk).all()
    if users:
        return users[0]
    return None


async def get_users_with_black_listed_token(token: str):
    tokens = await BlackListedTokens.find(
        BlackListedTokens.tokens << token
    ).all()
    if tokens:
        return tokens[0]
    return None


async def login_user(form_data):
    user = await find_existed_user(form_data.username)
    if not user:
        return {"status_code": 400, "message": "User not found!"}

    user = UserLoginSchema(email=user.email, password=user.password)
    is_valid = verify_password(form_data.password, user.password)
    if not is_valid:
        return {"status_code": 401, "message": "Invalid Credentials!"}

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = await create_access_token(
        data={"sub": form_data.username},
        expires_delta=access_token_expires,
    )
    print(access_token)
    return access_token


async def register_user(user):

    fetched_user = await find_existed_user(user.email)
    if fetched_user:
        return {"status_code": 400, "message": "User already signed up!"}

    # Create new user
    user.password = get_password_hash(user.password)
    user = await create_user(user)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = await create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires,
    )
    # Serialize user object.
    results = {
        "user": UserObjectSchema(**jsonable_encoder(user)),
        "token": access_token,
        "status_code": 201,
        "message": "You have been registered successfully,"
        "Proceed to the login page...",
    }
    return results
