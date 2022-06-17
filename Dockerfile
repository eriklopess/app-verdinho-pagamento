FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npx prisma generate
CMD ["npm", "start"]