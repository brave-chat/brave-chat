import datetime
import logging
from typing import Optional

from app.auth.crud import find_existed_user
from app.chats.schemas import MessageCreate
from app.models import Conversation, Message, Room, User
from app.users.schemas import UserObjectSchema

logger = logging.getLogger(__name__)


async def create_assign_new_room(user_pk: str, room_obj):
    room = None
    rooms = await Room.find(Room.room_name == room_obj.room_name).all()
    if rooms:
        room = rooms[0]
        if user_pk in room.members:
            logger.info(f"`{user_pk}` is already a member in this room!")
            results = {
                "status_code": 400,
                "message": "You have already joined room"
                f"{room_obj.room_name}!",
            }
            return results
        elif room.members:
            room.members.insert(0, user_pk)
            room.modified_date = datetime.datetime.utcnow()
            await room.save()

        logger.info(
            f"Adding {user_pk} to room `{room_obj.room_name}` members."
        )
        results = {
            "status_code": 200,
            "message": f"You have joined room {room_obj.room_name}!",
        }
        return results

    else:
        room = await Room(
            room_name=room_obj.room_name,
            members=[user_pk],
            conversations=[],
            description=room_obj.description,
        ).save()
        if room.members:
            room.members.insert(0, user_pk)
            room.modified_date = datetime.datetime.utcnow()
            await room.save()
        logger.info(
            f"Adding {user_pk} to room `{room_obj.room_name}` members."
        )
        results = {
            "status_code": 200,
            "message": f"You have joined room {room_obj.room_name}!",
        }
        return results


async def get_rooms_given_user(user_pk: str):
    rooms = await Room.find(Room.members << user_pk).all()
    return {"status_code": 200, "result": rooms}


async def get_rooms():
    rooms = await Room.find().all()
    if not rooms:
        return None
    return {"status_code": 200, "result": rooms}


async def get_room_conversations(room_name, user_pk):
    rooms = await Room.find(Room.room_name == room_name).all()
    if not rooms:
        return None
    conversations = await Conversation.find(
        Conversation.receiver == rooms[0].pk
    ).all()
    results = []
    for conversation in conversations:
        senders = await User.find(User.pk == conversation.sender).all()
        sender = senders[0]
        del sender.password
        messages_pk = conversation.messages
        messages = await Message.find(Message.pk << messages_pk).all()
        for message in messages:
            if sender.pk == user_pk:
                message.type_ = "sent"
            else:
                message.type_ = "received"
                message.sender = sender
        results.extend(messages)
    return {"status_code": 200, "result": results}


async def send_new_room_message(
    sender: UserObjectSchema, request: MessageCreate
):
    # Check for empty message
    if not request.content:
        return {
            "status_code": 400,
            "message": "You can't send an empty message!",
        }
    rooms = await Room.find(Room.room_name == request.receiver).all()
    if not rooms:
        return None
    room = rooms[0]
    if not request.receiver:
        return {
            "status_code": 400,
            "message": "You can't send a message to a non existing room!",
        }
    # create a new message
    new_message = await Message(
        content=request.content,
        message_type=request.message_type,
        media=request.media,
    ).save()
    # append the new message into conversation, check if conversation exists.
    conversation = await Conversation.find(
        Conversation.sender == sender.pk, Conversation.receiver == room.pk
    ).all()
    results = {
        "status_code": 200,
        "message": "Message has been delivered successfully!",
    }
    if not conversation:
        conversation = await Conversation(
            sender=sender.pk, receiver=room.pk, messages=[new_message.pk]
        ).save()
        if not room.conversations:
            room.conversations = [conversation.pk]
            await room.save()
        else:
            room.conversations.insert(0, conversation.pk)
            await room.save()
        results.update({"result": conversation})
        return results
    conversation = conversation[0]
    if new_message not in conversation.messages:
        conversation.messages.insert(0, new_message.pk)
        conversation.modified_date = datetime.datetime.utcnow()
        conversation = await conversation.save()
        if not room.conversations:
            room.conversations = [conversation.pk]
            await room.save()
        else:
            room.conversations.insert(0, conversation.pk)
            await room.save()
        results.update(
            {"result": "Your message has been delivered successfully!"}
        )
        return results
    return {"status_code": 400, "message": "Something went wrong!"}


async def delete_rooms(room_name: Optional[str] = None):
    if not room_name:
        return await Room.find().delete()
    else:
        return await Room.find(Room.room_name == room_name).delete()


async def search_user_rooms(search: str, user_pk: str):
    search = search.lower()
    results = await get_rooms_given_user(user_pk)
    if results:
        results = results["result"]
        return_results = []
        for room in results:
            if search in room.room_name.lower():
                return_results.append(room)
        results = {"status_code": 200, "result": return_results}
        return results
    return None


async def get_all_user_rooms(user):
    user = await find_existed_user(user)
    if not user:
        return
    return await get_rooms_given_user(user)
