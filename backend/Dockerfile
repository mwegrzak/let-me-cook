FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install && npx prisma generate && npx prisma db push


EXPOSE 5000

CMD ["npm", "start"]
