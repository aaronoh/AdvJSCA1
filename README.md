# CA1 - Advanced JavaScript - OOP Game Development
## N00143888 - Aaron O'Hare

This project was constructed using JavaScript (ES6), HTML and CSS.  It is basic recreation of the classic 'Space Invaders' game hosted on a node server, the users score, accuracy and name are stored in a mongo database. This was built for the purpose of a college assignment.

In order to run this project ensure that you have  [node.js](https://nodejs.org) installed. 


Once node is installed, the server can be started. Open a command window in the project directory and type: 

```
node server.js
```

When the server has started (check your command window for confirmation/errors)open your web browser and navigate to http://localhost:8080/

Once connected to the page you will be prompted to enter a username, from there you will be able to begin by pressing 'Play'. The ship is controlled using the left and right arrow keys, you fire using spacebar. The 'Invaders' are worth one point each, the 'special' red invader is worth ten points.
The game ends when you either kill all of the 'invaders' or they reach you. At this point, you will be presented with your score as well as the leaderboard. This leaderboard displays the 5 highest scores recorded along with the users' name and accuracy.    