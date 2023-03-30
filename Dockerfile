FROM node:16-alpine3.16

WORKDIR /TUGAS_AKHIR

COPY package.json package.json

RUN npm install


COPY /src/server.js server.js 
COPY /src/books.js books.js
COPY /src/handler.js handler.js 
COPY /src/routes.js routes.js
ENV PORT=3000
EXPOSE 3000

CMD ["node","server.js"]