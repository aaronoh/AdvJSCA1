function Shot(x,y){
  this.x = x;
  this.y = y;

  this.r = 4;
  this.toDel = false;

  this.show = function(){
    noStroke();
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  this.move = function(){
    this.y = this.y -5;
  }
  this.hits = function(enemy) {

    let prx = dist(this.x, this.y, enemy.x, enemy.y);
    if(prx < this.r + enemy.r){
      return true;
    }

    else{
      return false;
    }
  }
    this.del = function(){
        this.toDel = true;
    }
}
