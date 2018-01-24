function Shot(x,y){
  this.x = x;
  this.y = y;
  this.r = 4;
  this.toDel = false;

  //used to draw the shot
  this.show = function(){
    noStroke();
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  //used to control the movement of the shot
  this.move = function(){
    this.y = this.y - 5;
  }

  //hit detection
  this.hits = function(enemy) {
    //distance between shot an enemy
    let prx = dist(this.x, this.y, enemy.x, enemy.y);
    //if distance is less than the sum of the radius of the shot/enemy
    if(prx < this.r + enemy.r){
      return true;
    }
    else{
      return false;
    }
  }
  //used to mark the shot for deletion
    this.del = function(){
        this.toDel = true;
    }
}
