FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install && npx prisma generate && npx prisma db push

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
