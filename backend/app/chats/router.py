from fastapi import APIRouter, Depends

from app.auth.schemas import ResponseSchema
from app.chats.crud import (
    get_messages,
    get_sender_receiver_messages,
    send_new_message,
    delete_messages,
)
from app.chats.schemas import (
    GetAllMessageResult,
    GetAllMessageResults,
    MessageCreate,
    DeleteMessagesResult,
)

from app.users.schemas import UserObjectSchema
from app.utils.jwt_util import get_current_active_user
from fastapi import UploadFile, File
from typing import Any


router = APIRouter(prefix="/api/v1")


@router.post(
    "/message/media/{receiver_pk}",
    response_model=ResponseSchema,
    status_code=201,
    name="chats:send-media-message",
    responses={
        201: {
            "model": ResponseSchema,
            "description": "Message has been delivered successfully!",
        },
        401: {
            "model": ResponseSchema,
            "description": "Empty message, non existing receiver/room!",
        },
    },
)
async def send_media_message(
    receiver_pk: Any,
    file: UploadFile = File(...),
    currentUser: UserObjectSchema = Depends(get_current_active_user),
):
    """
    Deliver a new media message given an authenticated user.
    """
    results = await send_new_message(currentUser, receiver_pk, file)
    return results


@router.post(
    "/message",
    response_model=ResponseSchema,
    status_code=201,
    name="chats:send-message",
    responses={
        201: {
            "model": ResponseSchema,
            "description": "Message has been delivered successfully!",
        },
        401: {
            "model": ResponseSchema,
            "description": "Empty message, non existing receiver!",
        },
    },
)
async def send_message(
    request: MessageCreate,
    currentUser: UserObjectSchema = Depends(get_current_active_user),
):
    """
    Deliver a new message given an authenticated user.
    """
    results = await send_new_message(currentUser, request, None)
    return results


@router.get(
    "/message",
    status_code=200,
    name="chats:get-all-messages",
    responses={
        200: {
            "model": list[GetAllMessageResult],
            "description": "Return a list of messages"
            "for all senders and receivers.",
        },
    },
)
async def get_all_messages(currentUser=Depends(get_current_active_user)):
    """
    Return all messages grouped by senders and receivers.
    """
    results = await get_messages()
    return results


@router.get(
    "/conversation",
    response_model=GetAllMessageResults,
    status_code=200,
    name="chats:get-all-conversations",
    responses={
        200: {
            "model": GetAllMessageResults,
            "description": "Return a list of messages between two parties.",
        },
    },
)
async def get_conversation(
    receiver: str,
    currentUser: UserObjectSchema = Depends(get_current_active_user),
):
    """
    Return all messages grouped by senders for a given receiver.
    """
    results = await get_sender_receiver_messages(currentUser, receiver)
    return results

