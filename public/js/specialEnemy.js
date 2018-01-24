function SpecialEnemy(x,y){
    Enemy.call(this, x, y,'red', 25, 2)
}
//Create a new object based on the enemy prototype object
SpecialEnemy.prototype = Object.create(Enemy.prototype);
