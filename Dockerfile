FROM node:10-alpine

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 3000

CMD [ "node","app.js" ]

