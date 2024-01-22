FROM node:20.9-alpine3.18

WORKDIR /app

COPY package*.json .
RUN npm install 

COPY . .

EXPOSE 3000 

CMD ["npm", "start"]


