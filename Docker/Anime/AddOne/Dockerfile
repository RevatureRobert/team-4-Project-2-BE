FROM node:14-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json ./
RUN npm install

COPY build/Lamdas/Anime/AddOne ./

COPY build/DB ./

# WORKDIR /Post


CMD [AnimeAddOne.handler]