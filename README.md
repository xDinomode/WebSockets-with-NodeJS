#Websockets using NodeJS
##Implements http and https
----------------------------
##What is this project?
It's a 2d box inside a canvas that sends its position to all clients via 
websockets. Anyone that moves their box will also move everyone elses box. 

##public/
contains static files css/javascript and Foundation 5 as the frontend framework

##routes/
contains one router which handles get/post requests

##App runs both on https and http port 80
to use https simply create an ssl with your keys folder and uncomment 
the lines inside app.js

-----------------------------

#To run
1. Clone repo
2. cd into repo
3. npm install
4. node app.js
5. connect to localhost
