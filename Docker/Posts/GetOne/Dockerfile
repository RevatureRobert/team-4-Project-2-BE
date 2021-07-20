FROM node:14-alpine

RUN mkdir /app

WORKDIR /app

COPY build/Lamdas/Posts/GetOne /Post/
COPY package.json /Post/
COPY build/DB /Post/

WORKDIR /Post

RUN npm install

CMD [PostGetOne.handler]