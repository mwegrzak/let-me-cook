# let-me-cook
Webapp for hosting cooking receipes

## How to run

Install node.js and optionally docker if you wish to test mongodb locally
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
# adjust mongodb and mongo-express config in docker-compose
# non-production; just for debugging purposes
docker compose up -d 
cp env.example .env
vim .env
npm install
npm run dev
```