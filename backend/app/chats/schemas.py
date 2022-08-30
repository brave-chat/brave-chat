import datetime
from typing import Optional, Any
from pydantic import BaseModel, Field


class MessageCreate(BaseModel):
    receiver: str = Field(..., example="KV1QiLCJhbGciOiJIUzI1NiJ")
    content: str = Field(..., example="Hello World!")
    message_type: str = Field(..., example="text")
    media: Optional[str] = Field(..., example="")


class GetAllMessageResult(BaseModel):
    sender: str = Field(..., example="KV1QiLCJhbGciOiJIUzI1NiJ")
    receiver: str = Field(..., example="KdasdfsaV1QiLCJhbGcizI1w")
    messages: list[str] = Field(..., example="['Hello there!']")
    creation_date: datetime.datetime = Field(
        ..., example=datetime.datetime.utcnow()
    )
    modified_date: datetime.datetime = Field(
        ..., example=datetime.datetime.utcnow()
    )


class GetAllMessageResults(BaseModel):
    status_code: int = Field(..., example=200)
    result: list[dict[str, Any]]


class DeleteMessagesResult(BaseModel):
    status_code: int
    message: str
