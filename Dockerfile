#Stage 1
FROM node:20-alpine as builder
WORKDIR /src
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]