function Ship(){
  this.x = width/2;
  this.xdir = 0;
}

Ship.prototype.show = function(){
    fill(255)
    rect(this.x, height - 15, 40, 10 )
}
Ship.prototype.setDirection = function(direction){
    this.xdir = direction;
}
Ship.prototype.move = function(){
    this.x += this.xdir*5;
}
