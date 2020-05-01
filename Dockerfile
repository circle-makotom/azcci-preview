FROM node:current-alpine

COPY server.js /

CMD node /server.js
EXPOSE 58888/tcp
