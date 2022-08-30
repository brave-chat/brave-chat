from fastapi import APIRouter, Depends

from app.chats.schemas import MessageCreate
from app.rooms.crud import (
    create_assign_new_room,
    get_room_conversations,
    get_rooms,
    get_rooms_given_user,
    search_user_rooms,
    send_new_room_message,
)
from app.rooms.schemas import RoomCreate
from app.auth.schemas import ResponseSchema
from app.users.schemas import UserObjectSchema
from app.utils.jwt_util import get_current_active_user

router = APIRouter(prefix="/api/v1")


@router.post("/room",
    status_code=200,
    name="room:create-join-room",
    responses={
        200: {
            "model": ResponseSchema,
            "description": "Return a message that indicates a user has"
            " joined the room.",
        },
        400: {
            "model": ResponseSchema,
            "description": "Return a message that indicates if a user"
            " has already"
            " joined a room ",
        },
    },)
async def create_room(
    room: RoomCreate,
    currentUser: UserObjectSchema = Depends(get_current_active_user)
):
    """
    Create or join a room.
    """
    room = await create_assign_new_room(currentUser.pk, room)
    return room


@router.get("/rooms",
    status_code=200,
    name="rooms:get-joined-rooms",
    responses={
        200: {
            "model": ResponseSchema,
            "description": "Return a response that contains a list"
            " of joined rooms.",
        }
    },)
async def get_user_rooms(
    currentUser: UserObjectSchema = Depends(get_current_active_user)
):
    """
    Get all rooms for a given user.
    """
    rooms = await get_rooms_given_user(currentUser.pk)
    return rooms


@router.get("/room",
    status_code=200,
    name="rooms:get-all-rooms",
    responses={
        200: {
            "model": ResponseSchema,
            "description": "Return a response that contains a list"
            " of all available rooms.",
        }
    },)
async def get_all_rooms(
    currentUser: UserObjectSchema = Depends(get_current_active_user)
):
    """
    Fetch all available rooms.
    """
    rooms = await get_rooms()
    return rooms


@router.get("/room/conversation")
async def get_room_users_conversation(
    room: str,
    currentUser: UserObjectSchema = Depends(get_current_active_user),
):
    """
    Get Room by room name
    """
    room = await get_room_conversations(room, currentUser.pk)
    if room:
        return room


@router.post("/room/message")
async def send_room_message(
    request: MessageCreate,
    currentUser: UserObjectSchema = Depends(get_current_active_user),
):
    """
    Send a new message.
    """
    results = await send_new_room_message(currentUser, request)
    return results


@router.get("/rooms/search")
async def search_rooms_user(
    search: str,
    currentUser: UserObjectSchema = Depends(get_current_active_user),
):
    """
    Get all rooms for a given user
    """
    results = await search_user_rooms(search, currentUser.pk)
    if results:
        return results
