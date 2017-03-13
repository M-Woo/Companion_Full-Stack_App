# Companion_AI
A website for people seeking solace from the trials of everyday life by chatting with companions.

## Inspiration
I wanted to utilize markov chains somehow and a chat bot app seemed like a good way to utilize the sentences generated by the markov chain.
I also wanted to incorporate Websockets to maintain a consistent and interactive communication between th server and client without having to poll a server for a reply.

## Wireframing

### Home
![](wireframe/Home.png?raw=true)
### About
![](wireframe/about.png?raw=true)
### Signup
![](wireframe/Signup.png?raw=true)
### Login
![](wireframe/Login.png?raw=true)
### Profile
![](wireframe/Profile.png?raw=true)
### Companion
![](wireframe/companion.png?raw=true)
### Chat
![](wireframe/Chat.png?raw=true)

## Routes
| Method        | URL           | Template  | Purpose           |
| ------------- |:-------------:| -----:|:-------------:| 
|GET | / | main/index.ejs | Home page, company logo | 
|GET | /profile | profile.ejs | View profile page, username and email |
|DELETE | /profile/:id |  | Deletes user profile | 
|GET | /companion | companion/index.ejs | a view of all companions | 
|GET | /companion/one | companion/companion_1.ejs | The Chat Room of the first companion|
|GET | /Login | auth/login.ejs | Login page|
|POST | /Login | | Authenticate user data and redirects to home|
|GET | /signup | auth/signup.ejs | enter user data here to create new account|
|POST | /signup | | User Data is stored in database in Users table|
|GET | /logout | | Logout and redirect to home|


## Database / Tables

Typically when using a chatroom app, people want to remain ananymous and be able to access the chats easily. Thinking from a users perspective, I wanted to make the signup process as simple as possible. 

#### Users_Table
| Id    | username    |email     |password|
| :------------- | :------------- | :------------- | :------------- |
| 1       | m-woo       |m@gmail.com | alishdakbfcakwflkuaiu|
| 2       | k-dawg       |dawgy@woggy.com | kh1liye9218h2019|
| 3       | cheese-swiss       |cheese@pizza.com | akshd983yrufw37ighw|
| 4       | cat       |cat@fuzzball.gov | aknc09q378490jhbf|

## NPM

* "bcrypt": "^1.0.2",
* "body-parser": "^1.17.1",
* "connect-flash": "^0.1.1",
* "dotenv": "^4.0.0",
* "ejs": "^2.5.6",
* "express": "^4.15.2",
* "express-ejs-layouts": "^2.2.0",
* "express-session": "^1.15.1",
* "http": "0.0.0",
* "markovchain": "^1.0.2",
* "passport": "^0.3.2",
* "passport-local": "^1.0.0",
* "pg": "^6.1.3",
* "pg-hstore": "^2.3.2",
* "request": "^2.80.0",
* "sequelize": "^3.30.2",
* "sequelize-cli": "^2.5.1",
* "session": "^0.1.0",
* "socket.io": "^1.7.3"

## Improvements 

* Create a more diverse cast of Companions for users to talk to
* Create more chat rooms 
* Ability to update profile
* Create funcationality where users can see how many other users are logged on into the chat room


