function SpecialEnemy(x,y){
    Enemy.call(this, x, y,'red', 25, 2)
}

SpecialEnemy.prototype = Object.create(Enemy.prototype);
