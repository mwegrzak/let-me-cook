# let-me-cook
Webapp for hosting cooking recipes

## How to run

Install node.js
```
git clone https://github.com/mwegrzak/let-me-cook.git
cd let-me-cook
```

### frontend
```
cd frontend
npm install
npm run dev
```

### backend
```
cd backend
docker compose up -d 
cp env.example .env
vim .env
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```