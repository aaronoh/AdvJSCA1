let ship;
let enemy = [];
let specenemy = []
let shots = [];
let score = 0;

let acu = 0;
let shotsFired = 0;

let counter = 0;


//Setting the user using the html input field, begins by clearing local storage (needed if you ended the game before reaching the leaderboard last game)
function setUser() {
    localStorage.clear();
    //set the input field value to the value of the input field
    let val = document.getElementById("user").value;
    //if it blank alert the user
    if (val == "" || val ==" ") {
        alert("Please enter a username to play!")
    }
    //otherwise, set the val of newUser to the val of the input
    else {
        newUser = document.getElementById("user").value;
        //save it in local storage
        localStorage.setItem("newUser",newUser);
        //redirect to actual game page
        location.href = "http://localhost:8080/sketch.html";
    }
}
//retrieve user from local storage
const user = localStorage.getItem("newUser");
//const user = 'Testing'

//if user exists (retrieved from local storage)
if (user) {
    function newEn(x, y) {
        //create 30 enemy objs
        for (let i = 0; i < 30; i++) {
            //if i modulas 10 = 0 (new rows)
            if (i % 10 == 0) {
                //add 100 to y pos
                y += 100
                //set xpos back to 0
                x = 0
                enemy[i] = new Enemy(x * 70 + 70, y);
                x++

            }
            else {
                // continue existing row
                enemy[i] = new Enemy(x * 70 + 70, y);
                x++
            }
        }
    }

    function newSEn(x, y) {
        specenemy = new SpecialEnemy(x, y);
        //create a new special enemy every 12 seconds
        for (let i = 0; i < 10; i++) {
            setInterval(() => {
                specenemy.x = 0;
            }, 12000);
        }
    }

    function setup() {
        createCanvas(900, 700);
        //create ship, enemy, special enemy
        ship = new Ship();
        newEn(0, 0);
        newSEn(50, 100);
        //Increment var used by timer
        setInterval(() => counter++, 1000);
    }

    function draw() {
        //get canvas for manipulation
        var canvas = document.getElementById("defaultCanvas0");
        var ctx = canvas.getContext("2d");
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        background(40);
        //write time/score to canvas
        ctx.fillText(`Time: ${counter}`, 150, 50);
        ctx.fillText(`Score: ${score}`, 10, 50);
        //show/move ship
        ship.show();
        ship.move();
        //show/move special enemy
        specenemy.show();
        specenemy.move();

        //prevent ship from leaving canvas
        ship.x = constrain(ship.x, 20, width - 60);

        //for each shot in the shots array show & move
        for (let i = 0; i < shots.length; i++) {
            shots[i].show();
            shots[i].move();
            if (shots[i].hits(specenemy)) {
                score += 10;
                specenemy.x = 1000;
            }
            //for each enemy in the enemies array
            for (let j = 0; j < enemy.length; j++) {
                //if a shot is in contact with an enemy
                if (shots[i].hits(enemy[j])) {
                    //increment score, output score, remove the enemy and shot from their arrays
                    score++;
                    ctx.fillText(`Score: ${score}`, 10, 50);
                    enemy[j].del();
                    shots[i].del();
                }
            }
        }
        //boolean used to keep track of edge detection
        let sides = false;
        //for each enemy in the rray, show/move
        for (let i = 0; i < enemy.length; i++) {
            enemy[i].show();
            enemy[i].move();
            //if their x pos is greater than the width of the canvas or less than 0
            if (enemy[i].x > width || enemy[i].x <= 0) {
                sides = true;
            }

            //if enemy has reached player
            if (enemy[i].y > height - 25) {
                //delete enemy from array,
                enemy[i].del();
                //preesent game over text with users score
                ctx.fillStyle = "red";
                ctx.fillText("Game Over", width / 2 - 100, height / 2);
                ctx.fillText(`You hit ${score} Invaders!`, width / 2 - 150, height / 2 + 100);
                //call save score function, passing in user stats
                saveScore(user, score, acu, shotsFired, counter);
                //save current game stats to local storage
                localStorage.setItem("curScore", `You scored ${score} with an accuracy of ${Math.floor(acu)}%!`);
                //redirect to end screen after 1.5 secs
                setTimeout(() => {
                    location.href = "http://localhost:8080/end.html";
                }, 1500);
                noLoop();
                break;
            }
        }
        //if sides has been set to true
        if (sides) {
            //call goDown - which will move all enemies down by their radius and multiply their xpos by -1
            for (let i = 0; i < enemy.length; i++) {
                enemy[i].goDown();
            }
        }

        //if user has hit all enemies
        if (enemy.length === 0) {
            //present you win
            ctx.fillStyle = "green";
            ctx.fillText("You Win!", width / 2 - 100, height / 2);
            //call save score passing in current game stats
            saveScore(user, score, acu, shotsFired, counter);
            //save current game stats to local storage
            localStorage.setItem("curScore", `You scored ${score} with an accuracy of ${Math.floor(acu)}%!`);
            //redirect to end game page after 1.5 secs
            setTimeout(function () {
                location.href = "http://localhost:8080/end.html"
            }, 1500);
            noLoop();
        }

        //calculate accuracy - use score calc to offset the score incremnt change caused by special enemy
        let scoreCalc = 30 - enemy.length
        acu = shotsFired ? scoreCalc / shotsFired * 100 : 0;
        //output shots fired/rounded down % accuracy
        ctx.fillStyle = "white";
        ctx.fillText(`       Shots Fired: ${shotsFired}              Accuracy: ${Math.floor(acu)}%`, 300, 50);

        //if going forward  through and array and an item is removed - potential to skip elements - read backwards
        //If obj marked for deleteion, delete it
        for (let i = enemy.length - 1; i >= 0; i--) {
            if (enemy[i].toDel) {
                enemy.splice(i, 1);
            }
        }
        for (let i = shots.length - 1; i >= 0; i--) {
            if (shots[i].toDel) {
                shots.splice(i, 1);
            }
        }
    }

    function keyPressed() {
        //if spacebar pressed, create a new shot object, add it to the array, increment shots fired
        if (key === ' ') {
            let shot = new Shot(ship.x + 20, height - 20);
            shots.push(shot);
            shotsFired++;
        }
        //if right arrow pressed set direction to 1
        if (keyCode === RIGHT_ARROW) {
            ship.setDirection(1);
        }
        //if left arrow pressed set direction to -1
        else if (keyCode === LEFT_ARROW) {
            ship.setDirection(-1);
        }
    }

    //save score to db
    function saveScore(user, score, acu, shotsFired, counter) {
        //send PUT req to server
        fetch('/score', {
            method: 'PUT',
            //include game stats
            body: JSON.stringify({score: score, user: user, acu: acu, shotsFired: shotsFired, counter: counter}),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    console.log('score was updated in the DB.');
                    return;
                }
                throw new Error('Request failed.');
            })
            .catch(error => {
                console.log(error);
            });
    }
}

// else{
//
//     function setup() {
//         createCanvas(900, 700);
//     }
//      function draw() {
//          var canvas = document.getElementById("defaultCanvas0");
//          var ctx = canvas.getContext("2d");
//          ctx.font = "30px Arial";
//          ctx.fillStyle = "white";
//          background(40)
//          ctx.fillText("Please enter a username  on the previous page in order to play", width / 2 - 300, height / 2);
//      }
//}
