function Ship(){
  this.x = width/2;
  this.xdir = 0;
}

//draw the actual ship
Ship.prototype.show = function(){
    fill(255)
    rect(this.x, height - 15, 40, 10 )
}

//control direction
Ship.prototype.setDirection = function(direction){
    this.xdir = direction;
}

//control movement
Ship.prototype.move = function(){
    this.x += this.xdir*5;
}
