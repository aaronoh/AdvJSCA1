# CA1 - Advanced JavaScript - OOP Game Development
## N00143888 - Aaron O'Hare

This project was constructed using JavaScript (ES6), HTML and CSS.  It is basic recreation of the classic 'Space Invaders' game hosted on a node server and built for the purposes of a college assignment.

In order to run this project you will be required to install a few things. 

Firstly, ensure that you have  [node.js](https://nodejs.org) installed. 

We then need to install a number of node packages. 

Express: `npm install express --save`

MongoDB Driver: `npm install mongodb@2.2.33 --save`

Body Parser: `npm install body-parser --save`


Once the packages above are installed, the server can be started. Open a command window in the project directory and type: 

```
node server.js
```

Once the server has started (check your command window for confirmation/errors)open your web browser and navigate to http://localhost:8080/

When you connect to the page you will be prompted to enter a username, from there you will be able to cby pressing 'Play'. The ship is controlled using the left and right arrow keys, you fire using spacebar. The 'Invaders' are worth one point each, the 'special' red invader is worth ten points.   