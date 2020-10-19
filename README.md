# Nutrito-Fitness-Tracker

To get started,
1. Run local server of your preference (I used WAMP)
2. Create a schema (database) named **nutritojs** on mysql
3. Run `npm install` on *Nutrito-Fitness-Tracker* and *frontend* directories
4. Run `nodemon app.js` (back-end) from the *Nutrito-Fitness-Tracker* directory
5. Run `npm start` (front-end) from the *frontend* directory

The porject needs to be run on chrome with security disabled as this project makes use of cookies being passed from back-end to front-end which is not allowed by **CORS**.
run the code specified in *cors.txt* at the chrome installation directory. (This is to be done at your own risk)

[This project does not function properly with cors enabled]

Front-end uses port 3000,  
Back-end uses port 8080
