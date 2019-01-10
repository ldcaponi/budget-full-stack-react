# Budget - Full Stack React, Node.js, PostgreSQL
This is a budgeting app which lets users create budgets and expenses within those budgets.  Each budget will have a dashboard showing a detailed breakdown of money in, money out, and money left for the month.

## Features
App:
* JWT Authentication built in
* Semantic-UI for a clean look and feel

Frontend:
* React
* Redux

Backend:
* Node.js
* Express
* PostgreSQL

## To Run Locally
1. Create a database user in Postgres with CREATE DATABASE permissions (for development, you can just use superuser permissions)
2. Create a database, call it whatever you want
3. Create .env file in the root of the project (use .env.sample for reference) and fill in necessary items
4. Run backend by running ```npm i```, and then ```npm run dev``` in the root of the project
5. In another terminal, ```cd``` into the ```client``` folder.  Run ```npm i```, and then ```npm start```

## Notes
* Frontend and backend run on different ports in development
* In production, express server is set up to serve both backend and frontend from same port
