let ship;
let enemy = [];
let shots = [];
let score = 0;

let acu = 0;
let shotsFired = 0;

let counter = 0;

const user = prompt("Please enter a username");


//Variables for db
// score, acu, shotsFired, counter

function newEn(x,y){
    for(let i = 0; i < 30; i++){
        if(i%10 ==0){
            y += 100
            x = 0
            enemy[i] = new Enemy(x*70+70,y);
            x++

        }
        else{
            enemy[i] = new Enemy(x*70+70,y);
            x++
        }
    }
}

function timer() {
    counter ++;
}


function setup() {
 ship = new Ship();
 createCanvas(900,700);
 newEn(0,0);
 setInterval(timer, 1000)
}

function draw() {
    //print(enemy.length)
    var canvas = document.getElementById("defaultCanvas0");
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    background(40)
    ctx.fillText(`Time: ${counter}`, 150, 50);
    ctx.fillText(`Score: ${score}`, 10, 50);
    ship.show();
    ship.move();
    //prevent ship from leaving canvas
    ship.x = constrain(ship.x, 20, width - 60);

    //for each shot in the shots array show & move
    for (let i = 0; i < shots.length; i++) {
        shots[i].show();
        shots[i].move();
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
    let sides = false;

    for (let i = 0; i < enemy.length; i++) {
        enemy[i].show();
        enemy[i].move();
        if (enemy[i].x > width || enemy[i].x <= 0) {
            sides = true;
        }

        if (enemy[i].y > height - 25) {
            enemy[i].del();
            ctx.fillStyle = "red";
            ctx.fillText("Game Over", width / 2 - 100, height / 2);
            ctx.fillText(`You hit ${score} Invaders!` , width / 2 - 150, height / 2 + 100);
            saveScore(user, score,acu, shotsFired, counter);
            getScore();
            noLoop();
            break;
        }
    }

    if ( enemy.length == 0) {
        ctx.fillStyle = "green";
        ctx.fillText("You Win!", width / 2 - 100, height / 2);
        saveScore(user, score,acu, shotsFired, counter);
        console.log('Done');
        getScore();
        noLoop();
    }


    if (sides) {
        for (let i = 0; i < enemy.length; i++) {
            enemy[i].goDown();
        }
    }

    acu = score/shotsFired *100;
    ctx.fillStyle = "white";
    ctx.fillText(`       Shots Fired: ${shotsFired}              Accuracy: ${Math.floor(acu)}%`, 300, 50)

    //if going forward  through and array and an item is removed - potential to skip elements - read backwards
    for(let i = enemy.length-1; i >=0; i--) {
      if(enemy[i].toDel){
          enemy.splice(i,1);
      }
    }

    for(let i = shots.length-1; i >=0; i--) {
        if(shots[i].toDel){
            shots.splice(i,1);
        }
    }
}

function keyPressed(){
  if (key === ' '){
      let shot = new Shot(ship.x + 20, height-20);
      shots.push(shot);
      shotsFired++;
  }
  if (keyCode === RIGHT_ARROW){
    ship.setDirection(1);
  }
  else if (keyCode === LEFT_ARROW) {
    ship.setDirection(-1);
  }
}



function saveScore(user, score, acu, shotsFired, counter ) {
    console.log(user, score, acu, shotsFired, counter)
    fetch('/score', {
        method: 'PUT',
        body: JSON.stringify({score: score, user: user, acu: acu, shotsFired: shotsFired, counter: counter}),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if(response.ok) {
                console.log('score was updated in the DB.');
                getScore()
                return;
            }
            throw new Error('Request failed.');
        })
        .catch(function(error) {
            console.log(error);
        });
}

function getScore() {
    fetch('/score', {method: 'GET'})
        .then(function(response) {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(function(data) {
           console.log(data)
        })
        .catch(function(error) {
            console.log(error);
        });
}
