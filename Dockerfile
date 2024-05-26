FROM node:22.2.0-alpine3.20
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build
ENTRYPOINT ["yarn", "dev"]
