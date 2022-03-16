# 3D_Flix
#### Git Configuration:
Install Git:
* For Windows from https://gitforwindows.org/ 
* For Linux write on console *sudo apt-get install git*
* For Mac Os write on console *brew install git*
   
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
* cd server
* npm install express
* npm install morgan
* npm install express-jwt
* npm install jsonwebtoken
* npm install cookie-parser
* npm install mysql

Run the server with: *node server.js*
  
#### Database autentication routine:

On MySQLWorkBrench execute these SQL instructions to allow Server authentication from Node.js
1.  *ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';*
2.  *flush privileges;*

