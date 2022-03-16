# 3D_Flix
#### Git Configuration:
Install Git:
  1.1. For Windows from https://gitforwindows.org/ 
  1.2. For Linux write on console *sudo apt-get install git*
  1.3 For Mac Os write on console *brew install git*
   
When the installation is finished, just open git bash on Windows or simply the terminal on Mac OS and Linux and launch the following commands:
1. git config --global user.name "Name Surname"
2. git config --global user.email "email@domain.com"
3. cd Desktop
4. git clone https://github.com/HakimLaxe/3D_Flix

#### Server dependencies:

In order to run the server a set-up procedure has to be done. 
1. Install node.js from https://nodejs.org/it/download/ 
2. Install Visual Studio Code from https://code.visualstudio.com/download
   Than open VS Code Terminal and launch these commands: 
2.1 cd server
2.2 npm install express
2.3 npm install morgan
2.4 npm install express-jwt
2.5 npm install jsonwebtoken
2.6 npm install cookie-parser
2.7 npm install mysql

Run the server with: *node server.js*
  
#### Database autentication routine:

On MySQLWorkBrench execute these SQL instructions to allow Server authentication from Node.js
1.  *ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';*
2.  *flush privileges;*

