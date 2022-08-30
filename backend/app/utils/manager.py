from fastapi import WebSocket
import logging

logger = logging.getLogger(__name__)


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        self.active_personal_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket, room=True):
        await websocket.accept()
        if room:
            self.active_connections.append(websocket)
        else:
            self.active_personal_connections.append(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        # fetch the receiver websocket.
        receiver_web_socket = None 
        for web_sock in self.active_personal_connections:
            if web_sock != websocket:
                receiver_web_socket = web_sock
        if receiver_web_socket:
            await receiver_web_socket.send_text(message)
            logger.debug(f"Sending: {message}")
        else:
            logger.debug(f"Unable to send {message}!")

    async def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        elif websocket in self.active_personal_connections:
            self.active_personal_connections.remove(websocket)

    async def broadcast(self, message: str):
        logger.debug(
            f"Broadcasting across {len(self.active_connections)} CONNECTIONS"
        )
        for connection in self.active_connections:
            await connection.send_text(message)
            logger.debug(f"Broadcasting: {message}")
