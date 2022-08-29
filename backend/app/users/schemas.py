from pydantic import BaseModel, EmailStr, Field

from app.models import ChatStatus, UserRole, UserStatus


class UserObjectSchema(BaseModel):
    pk: str = Field(..., example="01GB0G74NQSTQ1TV66YZRFXEJT")
    first_name: str = Field(..., example="Mahmoud")
    last_name: str = Field(..., example="Harmouch")
    email: EmailStr = Field(..., example="business@wiseai.dev")
    phone_number: str = Field(..., example="999999999")
    bio: str = Field(..., example="A blazingly fast full stack developer.")
    chat_status: ChatStatus = Field(..., example=ChatStatus.online)
    user_status: UserStatus = Field(..., example=UserStatus.active)
    user_role: UserRole = Field(..., example=UserRole.regular)
    profile_picture: str = Field(..., example="https://wiseai.dev")


class UserLoginSchema(BaseModel):
    email: EmailStr = Field(..., example="business@wiseai.dev")
    password: str = Field(..., example="SEc11r3P@ssw0rD")


class UpdateStatus(BaseModel):
    chat_status: str = Field(..., example=ChatStatus.online)


class PersonalInfo(BaseModel):
    first_name: str = Field(..., example="Mahmoud")
    last_name: str = Field(..., example="Harmouch")
    bio: str = Field(..., example="A full stack developer")
    phone_number: str = Field(..., example="99999999")
