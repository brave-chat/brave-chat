from pydantic import BaseSettings


class Settings(BaseSettings):
    REDIS_HOST: str
    REDIS_PORT: str
    REDIS_USERNAME: str
    REDIS_PASSWORD: str
    JWT_SECRET_KEY: str
    DETA_PROJECT_KEY: str
    DEBUG: bool
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
