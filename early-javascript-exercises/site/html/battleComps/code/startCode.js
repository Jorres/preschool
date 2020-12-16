const TREESAMOUNT = 30, BUSHESAMOUNT = 50;

var ourArr = [], enemyArr = [], treeArr = [];

var curDir = {
    x: 0,
    y: 0
}

var sprites = {
    'sprites': {
        'pictures/smallsprites.png': {
            'tile': 30, 
            'tileh': 30,
            'map': {
                flash: [0, 0],
                redSoldier: [1, 1],
                blueSoldier: [2, 2]
            }
        },
        'pictures/blueTank.png': {
            'tile': 45, 
            'tileh': 45,
            'map': {
                blueTankUp: [0, 0],
                blueTankDown: [0, 1],
                blueTankRight: [1, 0],
                blueTankLeft: [1, 1]
            }
        },
        'pictures/treeSprite.png': {
            'tile': 75,
            'tileh': 75,
            'map': {
                T1: [0, 0], T2: [1, 0], T3: [2, 0]
            }
        },
        'pictures/bushSprite.png': {
            'tile': 40,
            'tileh': 40,
            'map': {
                B1: [0, 0], B2: [1, 0], B3: [2, 0]
            }
        }
    }
}

/* function makeTreesShiver (st) {
    var randTime = Crafty.math.randomInt(0, 200); 
    if (st + 5 <= treeArr.length) {
        for (var i = 0; i < 5; i++) {
            treeArr[i].animate('shivering', -1);
        }
        setTimeout(function () {makeTreesShiver(st + 5);}, randTime);
    } else {
        for (var i = 0; i < st + treeArr.length; i++) {
            treeArr[i].animate('shivering', -1);
        }
    }
} */

function initGame() {
    initComps();
    Crafty.init();
    Crafty.load(sprites);
    
    for (var i = 0; i < BUSHESAMOUNT; i++) {
        var tree = Crafty.e('2D, Canvas, B1, SpriteAnimation, Collision')
            .attr({x: Crafty.math.randomInt(80, window.innerWidth) - 75, y: Crafty.math.randomInt(80, window.innerHeight) - 75})
            .reel('shaking', 1800, [[0, 0], [1, 0], [2, 0]])
            .collision()
            .checkHits('leader')
            .bind('HitOn', function () {
                this.animate('shaking', 1);
            })
    }
    
    
    
    leader = Crafty.e('2D, Canvas, HP, blueTankDown, randomMoving, leader, Tween')
        .attr({x: 100, y: 100, w: 45, h: 45});
        /*.bind('KeyDown', function (e) {
            if ((e.key == Crafty.keys.UP_ARROW)||(e.key == Crafty.keys.W)) {
                setTankDir('blueTankUp', 0, -1);
            } else if ((e.key == Crafty.keys.DOWN_ARROW)||(e.key == Crafty.keys.S)) {
                setTankDir('blueTankDown', 0, 1);
            } else if ((e.key == Crafty.keys.LEFT_ARROW)||(e.key == Crafty.keys.A)) {
                setTankDir('blueTankLeft', -1, 0);
            } else if ((e.key == Crafty.keys.RIGHT_ARROW)||(e.key == Crafty.keys.D)) {
                setTankDir('blueTankRight', 1, 0);
            } else if (e.key == Crafty.keys.SPACE) {
                var curX = curDir.x, curY = curDir.y;
                var bullet = Crafty.e('2D, Canvas, Color, Collision, ourTankBullet')
                    .attr({x: leader.x + 16, y: leader.y + 16, w: 10, h: 10})
                    .color('blue')
                    .collision()
                    .checkHits('Enemy')
                    .bind('HitOn', function () {
                        this.destroy();
                    })
                    .bind('EnterFrame', function () {
                        
                        this.x += curX * 10;
                        this.y += curY * 10;
                    });
                    bullet._globalZ = 0;      
                    setTimeout(function () {bullet.destroy(); createFlash(bullet.x - 10, bullet.y - 10);}, 1200);
            }
        })*/
    leader.startMoving(100, 2000, 1000);
    leader.setHP(500);
    
    for (var i = 0; i < 10; i++) {
        var our = Crafty.e('2D, Canvas, randomMoving, HP, Our, shootingInf, Tween, Collision, blueSoldier, following')
            .attr({x: 200 + i * 60, y: 100, w: 30, h: 30})
            .collision()
            .checkHits('enemyBullet')
            .bind('HitOn', function () {
                this.decreaseHP(10);
                createFlash(this.x, this.y);
            });
        
            our.startMoving(30, 1000, 1000);
            our.enableFM(100, leader)
        
            ourArr.push(our);        
        
        var enemy = Crafty.e('2D, Canvas, randomMoving, HP, Enemy, shootingInf, Tween, Collision, redSoldier')
            .attr({x: 200 + i * 60, y: 500, w: 30, h: 30})
            .collision()
            .checkHits('ourBullet, ourTankBullet')
            .bind('HitOn', function () {
                this.decreaseHP(10);
                createFlash(this.x, this.y);
            });

            enemy.startMoving(30, 1000, 1000);
            enemyArr.push(enemy);
    }
    
    
    
    for (var i = 0; i < TREESAMOUNT; i++) {
        var tree = Crafty.e('2D, Canvas, T1, SpriteAnimation')
            .attr({x: Crafty.math.randomInt(80, window.innerWidth) - 75, y: Crafty.math.randomInt(80, window.innerHeight) - 75})
            .reel('shivering', 2000, [[0, 0], [1, 0], [2, 0]])
            .animate('shivering', -1);
        
        //treeArr.push(tree);
    }
    //makeTreesShiver(0);
    
    setTimeout(enableShooting, 3000);
}

function disableShooting() {
    for (var i = 0; i < ourArr.length; i++) {
        ourArr[i].disableSM();
    }
    for (var i = 0; i < enemyArr.length; i++) {
        enemyArr[i].disableSM();
    }
}

function enableShooting() {
    for (var i = 0; i < ourArr.length; i++) {
        ourArr[i].enableSM(500, enemyArr, 'Enemy', 'ourBullet', 'blue'); 
    }
    
    for (var i = 0; i < enemyArr.length; i++) {
        enemyArr[i].enableSM(500, ourArr, 'Our', 'enemyBullet', 'red');
    }
}

function setTankDir(dir, x, y) {
    curDir.x = x; curDir.y = y;
    leader.removeComponent('blueTankRight');
    leader.removeComponent('blueTankUp');
    leader.removeComponent('blueTankDown');
    leader.removeComponent('blueTankLeft');
    leader.addComponent(dir);
}

function createFlash(x, y) {
        var flash = Crafty.e('2D, Canvas, flash')
                .attr({x: x, y: y});
            
                function destroyFlash() {
                    flash.destroy();
                }

                setTimeout(destroyFlash, 200);
    }