import datetime
from enum import Enum
from typing import Optional

from aredis_om import Field, JsonModel
from pydantic import EmailStr, HttpUrl

from app.utils.session import redis_conn


class ChatStatus(str, Enum):
    online = "online"
    offline = "offline"
    busy = "busy"
    dont_disturb = "don't disturb"


class UserStatus(str, Enum):
    active = "1"
    disabled = "9"


class UserRole(str, Enum):
    regular = "regular"
    admin = "admin"


class MessageType(str, Enum):
    sent = "sent"
    received = "received"


class User(JsonModel):
    first_name: str = Field(index=True, full_text_search=True)
    last_name: str = Field(index=True, full_text_search=True)
    email: EmailStr = Field(index=True)
    password: str = Field(index=True)
    phone_number: str = Field(index=True, default="")
    bio: Optional[str] = Field(index=True, default="Full Stack Developer")
    profile_picture: Optional[str] = Field(
        index=True, default="https://wiseai.dev"
    )
    chat_status: Optional[ChatStatus] = Field(
        index=True, default=ChatStatus.online
    )
    user_status: Optional[UserStatus] = Field(
        index=True, default=UserStatus.active
    )
    user_role: Optional[UserRole] = Field(
        index=True, default=UserRole.regular
    )
    creation_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )
    modified_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )

    class Meta:
        database = redis_conn


class AccessToken(JsonModel):
    user: str = Field(index=True)
    tokens: list[str] = Field(index=True)
    creation_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )
    modified_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )

    class Meta:
        database = redis_conn


class Contact(JsonModel):
    user: str = Field(index=True)
    contacts: list[str] = Field(index=True)
    creation_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )
    modified_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )

    class Meta:
        database = redis_conn


class BlackListedTokens(JsonModel):
    user: str = Field(index=True)
    tokens: list[str] = Field(index=True)
    creation_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )
    modified_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )

    class Meta:
        database = redis_conn


class Message(JsonModel):
    content: str
    type_: str = Field(index=True, default=MessageType.sent)
    message_type: str = Field(index=True)
    media: Optional[str] = Field(index=True)
    creation_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )
    modified_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )

    class Meta:
        database = redis_conn


class Conversation(JsonModel):
    sender: str = Field(index=True)
    receiver: str = Field(index=True)
    messages: list[str] = Field(index=True)
    creation_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )
    modified_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )

    class Meta:
        database = redis_conn


class Room(JsonModel):
    room_name: str = Field(index=True)
    members: list[str] = Field(index=True)
    conversations: list[str] = Field(index=True)
    description: Optional[str] = Field(index=True)
    creation_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )
    modified_date: datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow
    )

    class Meta:
        database = redis_conn
