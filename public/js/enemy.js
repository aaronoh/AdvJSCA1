//Default params
function Enemy(x,y,colour = 'yellow', r =15, go = 5) {
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.r = r;
    this.goX = go;
    //def

    //bool used to mark for deletion
    this.toDel = false;

    Enemy.prototype.show = function () {
        noStroke();
        fill(this.colour);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    Enemy.prototype.move = function () {
        this.x = this.x + this.goX;
    }
        //setting del to true
        this.del = function () {
            this.toDel = true;
        }

    Enemy.prototype.goDown = function(){
        this.goX *= -1;
        this.y += this.r;

    }
}
