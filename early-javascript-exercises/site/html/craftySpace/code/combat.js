const ACCURACY = 130;

function myShoot() {
    var curX = curDir.x; curY = curDir.y;
    var bullet = Crafty.e('2D, Canvas, Color, Bullet')
        .attr({x: player.x + 35, y: player.y + 35, w: 10, h: 10})
        .color('green')
        .bind('EnterFrame', function () {
            this.x += BULLETSPEED * curX;
            this.y += BULLETSPEED * curY;
    });
    
    setTimeout(function () {bullet.destroy();}, BULLETLIFE);
}

function enemyShoot(enemy, x, y) {
    var bullet = Crafty.e('2D, Canvas, Color, EnemyBullet')
        .attr({x: enemy.x + 20, y: enemy.y + 20, w: 10, h: 10})
        .color('red')
        .bind('EnterFrame', function () {
            this.x += BULLETSPEED * x;
            this.y += BULLETSPEED * y;
    });
    
    setTimeout(function () {bullet.destroy();}, BULLETLIFE);
}

function createEnemy(x, y, addComp) {
    var curEnemy = galaxies[curGalaxy].enemy;
    var enemy = Crafty.e('2D, Canvas, Collision, Tween, ' + curEnemy + 'Bottom, Sprite, Enemy, enemyHP, enemyMoving')
        .attr({x: x, y: y, w: 50, h: 50})
        .collision()
        .checkHits('Bullet')
        .bind('HitOn', function() {
            this.decreaseHP();
        });
        
        if (addComp !== undefined) {enemy.addComponent(addComp);}
    
            function moveEnemy () {
                enemy.move();
            }
    
            var thisEnemyTimer = setTimeout(moveEnemy, 805);
}

function defNewHitPoints(HP) {
    curHitPoints = HP;
    playerHitPoints.attr({w: curHitPoints, x: (player.x -10 + (100 - curHitPoints) / 2) });
    
    if (HP <= 0) {
        clearTimeout(curSpeechTimer);
        Crafty('2D').each(function () {
            if (this.thisEnemyTimer !== undefined) {clearTimeout(this.thisEnemyTimer);}
            this.destroy();
        });
        recDied = true;
        setTimeout(function () {recDied = false;}, 5000);
        
        initStartShips();
    } else {
             if (HP < 10) {playerHitPoints.color('#FF3500');}
        else if (HP < 20) {playerHitPoints.color('#FF9000');}
        else if (HP < 30) {playerHitPoints.color('#FFA500');}
        else if (HP < 40) {playerHitPoints.color('#FFB800');}
        else if (HP < 50) {playerHitPoints.color('#FFCB00');}
        else if (HP < 60) {playerHitPoints.color('#FFE400');}
        else if (HP < 70) {playerHitPoints.color('#FFFA00');}
        else if (HP < 80) {playerHitPoints.color('#DFFA00');}
        else if (HP < 90) {playerHitPoints.color('#B1F100');}
        else if (HP < 100) {playerHitPoints.color('#84E900');}
        else if (HP == 100) {playerHitPoints.color('green');}
    }
}

function setRegeneration() {
         if (curHitPoints < 90) {curHitPoints += 10;}
    else if (curHitPoints < 100) {curHitPoints = 100;}
        defNewHitPoints(curHitPoints);
    
        setTimeout(function() { setRegeneration(); }, 5000);
}

function createExplosion(enemy) {
    var explosion = Crafty.e('2D, Canvas, explosion, Tween')
        .attr({h: 60, w: 60, x: enemy.x, y: enemy.y})
        .tween({alpha: 0.0}, 300);
    
    function destroyExplosion () {
        explosion.destroy();
    }
    
    setTimeout(destroyExplosion, 300);
}
