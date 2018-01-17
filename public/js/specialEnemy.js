function SpecialEnemy(){
    Enemy.call(this, 100, 200,'red')
}

SpecialEnemy.prototype = Object.create(Enemy.prototype);
