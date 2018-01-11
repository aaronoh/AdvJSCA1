function Enemy(x,y) {
    this.x = x;
    this.y = y;
    this.r = 15;

    this.goX = 1;
    //this.goY = 0;

    this.toDel = false;

    this.show = function () {
        noStroke();
        fill(255, 200, 0)
        ellipse(this.x, this.y, this.r * 2, this.r * 2)
    }

    this.move = function () {
        this.x = this.x + this.goX;
    }
        this.del = function () {
            this.toDel = true;
        }

    this.goDown = function(){
        this.goX *= -1;
        this.y += this.r;

    }
}
