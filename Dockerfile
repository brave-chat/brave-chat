# build stage
FROM node:lts-alpine

ENV REACT_APP_SERVER_URL=http://0.0.0.0:8000/api/v1
ENV REACT_APP_SOCKET_URL=ws://0.0.0.0:8000/api/v1/ws

WORKDIR /app

COPY ./  ./

RUN pnpm install

# production stage
CMD ["pnpm", "run", "dev"]