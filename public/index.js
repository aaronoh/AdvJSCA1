let ship;
let enemy = [];
let shots = [];

function setup() {
  createCanvas(800,500);
  ship = new Ship();
  for(let i = 0; i < 10; i++){
  enemy[i] = new Enemy(i*70+70,30);
}
}

function draw(){
  background(40)
  ship.show();
  ship.move();
  for (let i = 0; i < shots.length; i++) {
      shots[i].show();
      shots[i].move();
      for(let j = 0; j < enemy.length; j++){
          if(shots[i].hits(enemy[j]) || shots[i].height>height){
              enemy[j].del();
              shots[i].del();
          }
      }
  }
  let sides = false;
  for(let i = 0; i < enemy.length; i++){
    enemy[i].show();
    enemy[i].move();
    if(enemy[i].x > width || enemy[i].x <= 0){
        sides = true;
    }
  }
  if (sides){
      for(let i = 0; i < enemy.length; i++){
          enemy[i].goDown();
      }
  }
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
    console.log('Controlllllllll')
  if (key === ' '){
      let shot = new Shot(ship.x + 20, height-20);
      shots.push(shot);
  }
  if (keyCode === RIGHT_ARROW){
    ship.setDirection(1);
      console.log('right')
  }
  else if (keyCode === LEFT_ARROW) {
    ship.setDirection(-1);
    console.log('left')
  }
}
