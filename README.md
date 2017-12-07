### MERN + Passport.js
> example MERN stack application that uses authentication

* Mongo, Express, React, Node (MERN) + Passport.js for managing authentication
* This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Demo
![demo gif](./_screenshots/mern_passport_demo.gif)

View the live version of this app here:
[https://mern-passport.herokuapp.com/](https://mern-passport.herokuapp.com/)

## Project Structure
```
|-- server/
|  |-- server.js                            // The entry point for running the backend server locally, and main server for production
|  |-- passport/                             // Configuration files used to connect to different machines or set settings
|     |-- index.js                     // Overloads the passport object and defines serialize and deserialize
|     |-- localStrategy.js            // Defines a local strategy
|     |-- googleStrategy.js           // Defines google OAuth stratgey
|     ....
|  |-- db/                             
|     |-- index.js                  // Configures the connection to the database
|     |-- models/                   // represents data from our database, and defines schemas for each collection
|        |-- user.js                // Schema for the User collection
| -- src/                           // Entry for the React client side application
```

## Note
* make sure you have mongodb installed and started for local dev
* start local dev without google login by running `yarn start`
* If you want to use with google authentication you must:
  * register your app @ [https://console.developers.google.com](https://console.developers.google.com)
  * set `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` as environmental variables in a project root level document named `.env` [more about .env here](https://www.npmjs.com/package/dotenv)
  * uncomment lines 3 and 29 from server/passport/index.js to enable the strategy
  * uncomment lines 58, 59, and 60 from src/components/Login/LoginForm.jsx to show a google login button
* In development mode (i.e. `yarn start`), OAuth google callback is not being proxied to the google servers. Therefore in order to test the google OAuth on your local machine do the following:
1) `npm run build`
2) `npm run prod`
