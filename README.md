### To Run Frontend

1. if you're not inside `frontend` directory, type `cd frontend`
2. copy `.env-template` and rename it to `.env`
3. run `npm install`
4. run `npm start`

---

📝 Make sure you have installed `Docker` and running.\
📝 Download and Install `Postman`.

### To Run Server

1. if you're not inside `server` directory, type `cd server`
2. copy `.env-template` and rename it to `.env`
3. run `npm install`
4. run `docker-compose -p umpisa up -d`
5. run `npm run typeorm migration:run -- -d src/data-source.ts`
6. run `npm run dev`
7. Using postman, you need to create a user by creating a post request to `http://localhost:8000/api/v1/user`, Bearer token `KmpqlTqcfHlOoQvDjwK7tK2oKgBImkchqpaOsqWCxDx8lkRi5gMm9dQSUAitB20i`, body `{"email": "desired-email", "password": "desired-password" }`
8. 