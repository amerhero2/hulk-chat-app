HULK REALTIME CHAT APPLICATION

App Url: https://hulk-chat-app-6amz.vercel.app/




TECHNOLOGIES USED:
1. React.js
2. Node.js (Express.js)
3. Redis
4. MySQL & Sequelize.js ORM
5. SocketIO (For handling websockets)
6. Redis (As a pub-sub server & as a rate limiter)

Project Architecture:


<img width="721" alt="Screenshot 2024-07-31 at 21 24 29" src="https://github.com/user-attachments/assets/42dfc594-aa42-41b3-8b53-aff3bcbee866">




HOW TO RUN LOCALLY:

1. Ensure that you have Node.js installed
2. Ensure that you have MySQL installed (Or use Docker)
3. Ensure that you can run Redis locally (Docker recommended)
4. Ensure that you have sequelize-cli installed (if you don't, run `npm install --save-dev sequelize-cli`)
5. Clone project into your folder
6. Add .env files to /client-side and /api
7. Navigate to /client-side folder and run `npm install`, `npm start`
8. Navigate to /api folder and run `npm install`
9. Create a database on wherever you decided to keep the database running (CREATE DATABASE hulkdb)
10. Navigate to /api folder and run `npx sequelize-cli db:migrate`  to run all neccessary migrations.
11. Add nodemon by running `npm install --save-dev nodemon`
12. Navigate to /api folder and run `npm run dev`

That should do the job, app should be running now!
