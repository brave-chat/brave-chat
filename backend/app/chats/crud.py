import datetime
import logging

from app.auth.crud import find_existed_user
from app.chats.schemas import MessageCreate
from app.models import Conversation, Message, User, Room
from app.users.schemas import UserObjectSchema
from app.config import Settings
import uuid

from deta import Deta

logger = logging.getLogger(__name__)

# initialize with a project key
deta = Deta(Settings().DETA_PROJECT_KEY)

# create and use as many Drives as you want!
images = deta.Drive("sent-images")


async def send_new_message(
    sender: UserObjectSchema, request: MessageCreate, file
):
    # Check for empty message
    if isinstance(request, str) and file:
        # file upload
        receiver_pk = request
        receivers = await User.find(User.pk == receiver_pk).all()
        if receivers:
            receiver = receivers[0]
        else:
            # message sent in a room
            receivers = await Room.find(Room.pk == receiver_pk).all()
            receiver = receivers[0]
        file_name = f"user/{str(sender.pk)}/image_{str(uuid.uuid4())}.png"
        ret_file_name = images.put(file_name, file.file)
        print(file_name, ret_file_name)
        # create a new message
        new_message = await Message(
            content="",
            message_type="media",
            media=file_name,
        ).save()
    else:
        if not request.content:
            return {
                "status_code": 400,
                "message": "You can't send an empty message!",
            }
        receiver = await find_existed_user(email=request.receiver)
        if not receiver:
            return {
                "status_code": 400,
                "message": "You can't send a message to a non existing user!",
            }
        # create a new message
        new_message = await Message(
            content=request.content,
            message_type=request.message_type,
            media="",
        ).save()
    # append the new message into conversation, check if conversation exists.
    conversation = await Conversation.find(
        Conversation.sender == sender.pk, Conversation.receiver == receiver.pk
    ).all()
    results = {
        "status_code": 201,
        "message": "Message has been delivered successfully!",
    }
    if not conversation:
        await Conversation(
            sender=sender.pk, receiver=receiver.pk, messages=[new_message.pk]
        ).save()
        return results
    conversation = conversation[0]
    if new_message not in conversation.messages:
        conversation.messages.insert(0, new_message.pk)
        conversation.modified_date = datetime.datetime.utcnow()
        await conversation.save()
        return results
    return {"status_code": 400, "message": "Something went wrong!"}


async def get_messages():
    # can't do aggregation with redis-om
    conversations = await Conversation.find().all()
    for conversation in conversations:
        # User.get(pk=...) throw an exception if record doesn't exist.
        senders = await User.find(User.pk == conversation.sender).all()
        conversation.sender = senders[0].email
        receivers = await User.find(User.pk == conversation.receiver).all()
        if not receivers:
            # message in a room
            receivers = await Room.find(
                Room.pk == conversation.receiver
            ).all()
            conversation.receiver = "Room #" + receivers[0].room_name
        else:
            conversation.receiver = receivers[0].email
        for i, message_pk in enumerate(conversation.messages):
            messages = await Message.find(User.pk == message_pk).all()
            conversation.messages[i] = messages
    return {"status_code": 200, "result": conversations}


async def get_sender_receiver_messages(
    sender: UserObjectSchema, receiver: str
):
    receiver = await find_existed_user(email=receiver)
    conversation_sent = await Conversation.find(
        Conversation.sender == sender.pk, Conversation.receiver == receiver.pk
    ).all()
    messages_sent = []
    messages_received = []
    if conversation_sent:
        conversation_sent = conversation_sent[0]
        for message_pk in conversation_sent.messages:
            message = await Message.get(message_pk)
            message.type_ = "sent"
            await message.save()
            messages_sent.append(message)
    conversation_received = await Conversation.find(
        Conversation.sender == receiver.pk, Conversation.receiver == sender.pk
    ).all()
    if conversation_received:
        conversation_received = conversation_received[0]
        for message_pk in conversation_received.messages:
            message = await Message.get(message_pk)
            message.type_ = "received"
            await message.save()
            messages_received.append(message)
        messages_sent.extend(messages_received)
    messages_sent = sorted(messages_sent, key=lambda obj: obj.creation_date)
    results = {"status_code": 200, "result": messages_sent}
    return results


async def delete_messages():
    nb_del_records = await Message.find().delete()
    await Conversation.find().delete()
    return {
        "status_code": 200,
        "result": f"{nb_del_records} messages has"
        "been deleted successfully!",
    }
