const STARTHP = 100;

function initComps () {
    Crafty.c('HP', {
        HP: STARTHP,
        decreaseHP: function(x) { // обращение e.decreaseHP(num);
            if (this.HP > x) {
                this.HP -= x;    
            } else {
                this.tween({alpha: 0.0}, 200);
                var Entity = this;
                function destroyEntity() {
                    Entity.destroy();
                    clearTimeout(Entity.shootTimer);
                    clearTimeout(Entity.walkTimer);
                    
                    for (var i = 0; i < 10; i++) {
                        if (Entity === ourArr[i]) {ourArr.splice(i, 1)}
                        if (Entity === enemyArr[i]) {enemyArr.splice(i, 1)}
                    }
                }
                setTimeout(destroyEntity, 200);         
            }
        },
        setHP: function (x) {
            this.HP = x;
        }
    });

    Crafty.c('randomMoving', { 
        walkTimer: 1,
        startMoving: function (step, stepTime, stayTime) {
            var dir = Crafty.math.randomInt(0, 5);
            switch (dir) {
                case (2): 
                    this.tween({x: this.x + step}, stepTime); 
                    break; // right
                case (3): 
                    this.tween({x: this.x - step}, stepTime); 
                    break; // left
                case (4): 
                    this.tween({y: this.y + step}, stepTime); 
                    break; // down
                case (5): 
                    this.tween({y: this.y - step}, stepTime); 
                    break; // up
            }; 
            
            var entity = this;
            
            function continueMoving() {
                entity.startMoving(step, stepTime, stayTime);    
            }
            
            this.walkTimer = setTimeout(continueMoving, stepTime + stayTime);
        },
        stopMoving: function () {
            clearTimeout(this.walkTimer);
        }
    });
    
    Crafty.c('shootingInf', {
        shootTimer: 1,
        enableSM: function (reloadTime, targArr, whomToCheck, bulletType, color) {
            
            var target = targArr[Crafty.math.randomInt(0, targArr.length - 1)];
            
            shootSingleBullet(this, target, whomToCheck, bulletType, color);
            
            var entity = this;
            
            function shootWeiter() {
                entity.enableSM(reloadTime, targArr, whomToCheck, bulletType, color);
            }
            
            this.shootTimer = setTimeout(shootWeiter, reloadTime);
        },
        
        disableSM: function () {
            clearTimeout(this.shootTimer)
        }
    });
    
    Crafty.c('following', {
        followTimer: 1,
        speed: 80,
        enableFM: function (followTime, target) {
            
            if (dist(this.x, this.y, target.x, target.y) >= 100) {
                this.x += (target.x - this.x) / this.speed;
                this.y += (target.y - this.y) / this.speed;
            } else if (dist(this.x, this.y, target.x, target.y) < 100) {
                this.x -= (target.x - this.x) / this.speed;
                this.y -= (target.y - this.y) / this.speed;
            }
            
            var entity = this;
            function followWeiter () {
                entity.enableFM(followTime, target);
            }
            this.followTimer = setTimeout(followWeiter, followTime)
        },
        disableFM: function () {
            clearTimeout(this.followTimer);
        }
    });
}

function createSpecTroops (side, x, y) {
    if (side == 'blue') {
        var arr = ourArr;
        var soldier = 'blueSoldier';
        var enemyBulletType = 'enemyBullet';
        var curAttr = 'Our';
    } else {
        var arr = enemyArr;
        var soldier = 'redSoldier';
        var enemyBulletType = 'ourBullet';
        var curAttr = 'Enemy';
    }
    
    disableShooting();
    
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var troop = Crafty.e('2D, Canvas, randomMoving, HP, Collision, Tween, shootingInf, ' + soldier  + ', ' + curAttr)
                .attr({x: x + i * 30, y: y + j * 30})
                .collision()
                .checkHits(enemyBulletType)
                .bind('HitOn', function () { this.decreaseHP(10); });
        
            troop.startMoving(30, 1000, 1000)
            
            arr.push(troop);
        }
    }
    
    enableShooting();
}       