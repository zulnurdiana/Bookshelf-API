FROM node:16-alpine3.16

WORKDIR /TUGAS_AKHIR

COPY package.json package.json

RUN npm install


COPY /src/server.js /src/server.js 
COPY /src/books.js /src/books.js
COPY /src/handler.js /src/handler.js 
COPY /src/routes.js /src/routes.js

CMD ["npm","start"]