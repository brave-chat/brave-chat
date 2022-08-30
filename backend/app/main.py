import os
import time

import uvicorn
from aredis_om import Migrator as AsyncMigrator
from fastapi import FastAPI, Request, WebSocket, status
from fastapi.middleware.cors import CORSMiddleware
from redis_om import Migrator as SyncMigrator
import json
from app.auth import router as auth_router
from app.models import User
from app.chats import router as chats_router
from app.contacts import router as contacts_router
from app.rooms import router as rooms_router
from app.users import router as users_router
from app.utils.session import redis_conn
from app.config import Settings
from app.utils.manager import ConnectionManager
import logging
from starlette.websockets import WebSocketState


logger = logging.getLogger(__name__)

if Settings().DEBUG == True:
    chat_app = FastAPI(
        docs_url="/docs",
        redoc_url="/redocs",
        title="Realtime Chat App",
        description="Realtime Chat App Backend",
        version="1.0",
        openapi_url="/api/v1/openapi.json",
    )
else:
    chat_app = FastAPI(
        debug=True,
        title="API",
        openapi_url=None,
        docs_url=None,
        redoc_url=None,
    )

origins = [
    "http://127.0.0.1:8000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://localhost:3000",
]

chat_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@chat_app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    request.state.connection = redis_conn
    response = await call_next(request)
    start_time = time.time()
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)

    return response


@chat_app.on_event("startup")
async def startup():
    SyncMigrator().run()
    await AsyncMigrator().run()


manager = ConnectionManager()
# https://sandfishfactory.hatenablog.com/entry/2021/12/14/000000
# https://github.com/sandfishfactory/blogapp_python/tree/main/fastapi_websocket


@chat_app.websocket("/ws/{sender_pk}/{room_name}")
async def websocket_room_endpoint(websocket: WebSocket, sender_pk: str, room_name: str):
    try:
        # add user
        # the user on the
        await manager.connect(websocket)
        senders = await User.find(User.pk == sender_pk).all()
        sender = senders[0]
        data = {
            "content": f"{sender.first_name} has entered the room!",
            "room_name": room_name,
            "type": "entrance",
            "user": dict(sender),
        }
        await manager.broadcast(json.dumps(data, default=str))
        # wait for messages
        while True:
            if websocket.application_state == WebSocketState.CONNECTED:
                data = await websocket.receive_text()
                message_data = json.loads(data)
                message_data["user"] = dict(sender)
                if message_data.get("type", None) == "leave":
                    logger.warning(message_data["content"])
                    logger.info("Disconnecting from Websocket")
                    await manager.disconnect(websocket, room_name)
                    break
                else:
                    logger.info(f"DATA RECIEVED: {data}")
                    await manager.broadcast(
                        json.dumps(message_data, default=str)
                    )
            else:
                logger.warning(
                    f"Websocket state: {websocket.application_state}, reconnecting..."
                )
                await manager.connect(websocket, room_name)
    except Exception as ex:
        message = f"An exception of type {type(ex).__name__} occurred. Arguments:\n{ex.args!r}"
        logger.error(message)
        # remove user
        logger.warning("Disconnecting Websocket")
        # await remove_user_from_room(None, room_name, username=user_name)
        # room = await get_room(room_name)
        data = {
            "content": f"{sender.first_name} has left the chat",
            "room_name": room_name,
            "type": "dismissal",
        }
        await manager.broadcast(f"{json.dumps(data, default=str)}")
        await manager.disconnect(websocket)


@chat_app.websocket("/ws/chat/{sender_pk}/{receiver_pk}")
async def websocket_chat_endpoint(websocket: WebSocket, sender_pk: str, receiver_pk: str):
    try:
        # add user
        await manager.connect(websocket, False)
        senders = await User.find(User.pk == sender_pk).all()
        sender = senders[0]
        receivers = await User.find(User.pk == receiver_pk).all()
        receiver = receivers[0]
        data = {
            "content": f"{sender.first_name} is online!",
            "type": "open",
            "user": dict(sender),
        }
        # serialize and send the data
        await manager.send_personal_message(json.dumps(data, default=str), websocket)
        # wait for messages
        while True:
            if websocket.application_state == WebSocketState.CONNECTED:
                data = await websocket.receive_text()
                message_data = {"content": json.loads(data), "user": dict(sender)}
                if message_data.get("type", None) == "leave":
                    logger.warning(message_data["content"])
                    logger.info("Disconnecting from Websocket")
                    await manager.disconnect(websocket)
                    break
                else:
                    logger.info(f"DATA RECIEVED: {data}")
                    await manager.send_personal_message(json.dumps(message_data, default=str), websocket)
            else:
                logger.warning(
                    f"Websocket state: {websocket.application_state}, reconnecting..."
                )
                await manager.connect(websocket, False)
    except Exception as ex:
        message = f"An exception of type {type(ex).__name__} occurred. Arguments:\n{ex.args!r}"
        logger.error(message)
        # remove user
        logger.warning("Disconnecting Websocket")
        # await remove_user_from_room(None, room_name, username=user_name)
        # room = await get_room(room_name)
        data = {
            "content": f"{sender.first_name} has left the chat",
            "type": "leave",
        }
        await manager.broadcast(f"{json.dumps(data, default=str)}")
        await manager.disconnect(websocket)


@chat_app.get("/api")
async def root():
    return {"message": "Welcome to this blazingly fast realtime chat app."}


chat_app.include_router(auth_router.router, tags=["Auth"])
chat_app.include_router(users_router.router, tags=["User"])
chat_app.include_router(rooms_router.router, tags=["Room"])
chat_app.include_router(chats_router.router, tags=["Chat"])
chat_app.include_router(contacts_router.router, tags=["Contact"])

def serve() -> None:
    try:
        uvicorn.run("app.main:chat_app", host="0.0.0.0", workers=4, port=8000, reload=True, debug=True)
    except Exception as e:
        print(e)

if __name__ == "__main__":
    serve()