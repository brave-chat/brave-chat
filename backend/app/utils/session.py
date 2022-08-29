from aredis_om import get_redis_connection

from app.config import Settings

settings = Settings()

if not settings.DEBUG:
    redis_conn = get_redis_connection(
        host=settings.REDIS_HOST,
        port=settings.REDIS_PORT,
        username=settings.REDIS_USERNAME,
        password=settings.REDIS_PASSWORD,
        decode_responses=True,
    )
else:
    redis_conn = get_redis_connection(
        url="redis://localhost:6379", decode_responses=True
    )
