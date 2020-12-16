var player, playerHitPoints, station, curText, mapShowed, pult = false, invOpened = false, recDied = false, upgradesReached = false, curMoney = 100, curHitPoints;
var curGalaxy = 0; 
const BULLETSPEED = 10, BULLETLIFE = 600, ENEMYSPEED = 100;

var curDir = {
    x: 0,
    y: -1
};

var galaxies = [
    { // центр обучения совпадает с альфа галактикой
        station: 'alphaSt',
        alien: 'alAlpha',
        enemy: 'alpha'
    },
    {
        fone: 'pictures/alphafone.png',
        station: 'alphaSt',
        alien: 'alAlpha',
        enemy: 'alpha'
    },
    {
        fone: 'pictures/betafone.png',
        station: 'betaSt',
        alien: 'alBeta',
        enemy: 'beta'
    },
    {
        fone: 'pictures/gammaFone.png',
        station: 'gammaSt',
        alien: 'alGamma',
        enemy: 'gamma'
    },
    {
        fone: 'pictures/deltaFone.png',
        station: 'deltaSt',
        alien: 'alDelta',
        enemy: 'delta'
    }
];

var btnSprite = {
    "sprites": {
        "pictures/buttonSprite.png": {
            "tile": 60,
            "tileh": 60,
            "map": { 
                cancel: [0, 0],
                alpha: [1, 0],
                beta: [2, 0],
                gamma: [3, 0],
                delta: [4, 0],
                pultMap: [5, 0],
                highlight: [6, 0],
                pultInv: [7, 0],
                captainHead: [0, 1],
                explosion: [1, 1]
            }     
        },        
        "pictures/mapFone.png": {
            "tile": 900,
            "tileh": 400,
            "map": { mapFone: [0, 0] }
        },
        "pictures/controles.png": {
            "tile": 600,
            "tileh": 200,
            "map": { pult: [0, 0] }
        },
        "pictures/stations.png": {
            "tile": 100,
            "tileh": 100,
            "map": {
                alphaSt: [0, 0],
                betaSt: [1, 0],
                gammaSt: [2, 0],
                deltaSt: [3, 0]
            }
        },
        "pictures/playerShip.png": {
            "tile": 80,
            "tileh": 80,
            "map": {
                top1: [0, 0],
                left1: [1, 0],
                right1: [2, 0],
                bottom1: [3, 0]
            }
        },
        "pictures/talkFone.png": {
            "tile": 500,
            "tileh": 300,
            "map": {
                talkFone: [0, 0],
            }
        },
        "pictures/aliens.png": {
            "tile": 140,
            "tileh": 200,
            "map": {
                alDelta: [0, 0],
                alAlpha: [1, 0],
                alBeta: [0, 1],
                alGamma: [1, 1]
            }
        },
        "pictures/enemyShips.png": {
            "tile": 50,
            "tileh": 50,
            "map": {
                alphaLeft: [0, 0], alphaRight: [1, 0], alphaTop: [2, 0], alphaBottom: [3, 0],
                betaLeft: [0, 1], betaRight: [1, 1], betaTop: [2, 1], betaBottom: [3, 1],
                gammaLeft: [0, 2], gammaRight: [1, 2], gammaTop: [2, 2], gammaBottom: [3, 2],
                deltaLeft: [0, 3], deltaRight: [1, 3], deltaTop: [2, 3], deltaBottom: [3, 4],
            }
        }
    }
};

function loadSprites() {
    Crafty.load(btnSprite);
    Crafty.sprite('pictures/buttonSprite.png', {cancel: [0, 0, 50, 50]});
}

function initGame() {
    Crafty.init(window.innerWidth, window.innerHeight);
    loadSprites();
    initStartShips();
    
    Crafty.c('enemyHP', {
        HP: 100,
        remove: function () {
            var enemy = this;
            createExplosion(enemy);
        },
        decreaseHP: function () {
            if (this.HP >= 10) {
                this.HP -= 10;
                var enemy = this;
                createExplosion(enemy);                
            } else {
                this.tween({alpha: 0.0}, 200);
                
                var enemy = this;
                
                function destroyEnemy () {
                    clearTimeout(enemy.thisEnemyTimer);
                    enemy.destroy();
                }
                
                setTimeout(destroyEnemy, 205);
            }
        }
    });
    Crafty.c('enemyMoving', {
        move: function () {
            var curEnemy = galaxies[curGalaxy].enemy;
            
            this.removeComponent(curEnemy + 'Top'); this.removeComponent(curEnemy + 'Bottom');  
            this.removeComponent(curEnemy + 'Left'); this.removeComponent(curEnemy + 'Right');
            
            var difX = player.x - this.x, difY = player.y - this.y ;
                        
            
                if (Math.abs(difX) > Math.abs(difY)) {
                    if (difX > 0) {
                        this.addComponent(curEnemy + 'Right');
                        if (Math.abs(player.y - this.y) < ACCURACY) {enemyShoot(this, 1, 0);}
                    } else {
                        this.addComponent(curEnemy + 'Left');
                        if (Math.abs(player.y - this.y) < ACCURACY) {enemyShoot(this, -1, 0);}
                    }
                } else {
                    if (difY > 0) { 
                        this.addComponent(curEnemy + 'Bottom');
                        if (Math.abs(player.x - this.x) < ACCURACY) {enemyShoot(this, 0, 1);}
                    } else {
                        this.addComponent(curEnemy + 'Top');
                        if (Math.abs(player.x - this.x) < ACCURACY) {enemyShoot(this, 0, -1);}
                    }
                }
            
            var dirX = player.x + Crafty.math.randomInt(-200, 200), 
                dirY = player.x + Crafty.math.randomInt(-200, 200);
            
            this.tween({x: dirX, y: dirY}, 800, 'easeInOutQuad');
            
            var enemy = this;
            
            function moveEnemy () {
                enemy.move();
            }
            
            this.thisEnemyTimer = setTimeout(moveEnemy, 805)
    
        },
        
        thisEnemyTimer: setTimeout(this.move, 805)
            
    });
}

function initStartShips() {  
    $('body').css('background', 'url(pictures/studyCenterFone.png)')
    curGalaxy = 0;
    
    initPlayer();
    initPult();
    tutorialBeforeBot();
    //checkIfAlphaAfterBeta();
}

function initPlayer() {
    curHitPoints = 100;
    
    playerHitPoints = Crafty.e('2D, Canvas, Color')
        .attr({x: -10, y: 90, w: 100, h: 10, alpha: 0.6});
    
    player = Crafty.e('2D, top1, Canvas, Collision, Solid, Fourway, SpriteAnimation')
        .attach(playerHitPoints)
        .attr({x: 400, y: 400, w: 80, h: 80})
        .fourway(200)
        .collision()
        .checkHits('EnemyBullet')
        .bind('HitOn', function() {
            createExplosion(player);
            defNewHitPoints(curHitPoints - 10);
        })
        .bind('KeyDown', function(e) {
        if ((e.key == Crafty.keys.UP_ARROW)||(e.key == Crafty.keys.W)) {
            setShipDir('top1', 0, -1);
        } else if ((e.key == Crafty.keys.DOWN_ARROW)||(e.key == Crafty.keys.S)) {
            setShipDir('bottom1', 0, 1);
        } else if ((e.key == Crafty.keys.LEFT_ARROW)||(e.key == Crafty.keys.A)) {
            setShipDir('left1', -1, 0);
        } else if ((e.key == Crafty.keys.RIGHT_ARROW)||(e.key == Crafty.keys.D)) {
            setShipDir('right1', 1, 0);
        } else if (e.key == Crafty.keys.SPACE) {
            myShoot();
        }
    });
    
    playerHitPoints.color('green');
    
    setTimeout(function() { setRegeneration(); }, 5000);
}

function initStation(x, y, h, w, StType) {
    station = Crafty.e('2D, Canvas, Collision, Solid, Tween, ' + StType)
        .attr({x: x, y: y, w: w, h: h, alpha: 0.0})
        .collision()
        .checkHits('Solid')
        .bind('HitOn', function () {showUpgradeScreen();})
        .bind('HitOff', function () {closeUpgradeScreen();})
        .bind('EnterFrame', function () { this.rotation += 0.4; })
        .origin('center')
        .tween({alpha: 1.0}, 400);
}

function travel(num) {
    closeMap();
    curGalaxy = num;
    if (station !== undefined) { // иногда станции не будет
        station.tween({alpha: 0.0}, 400);
        setTimeout( function () {
            station.destroy();
        }, 400); }
    
    
    $('body').css('background', 'url(' + galaxies[num].fone + ')');
    
    setTimeout( function () {
        initStation(500, 500, 100, 100, galaxies[num].station);
    }, 500);
}

function setShipDir(dir, x, y) {
    switch (dir) {
        case ('top1'): 
            player.reel('top', 500, [[0, 0], [1, 0]]).animate('top', -1);
            break;
        case ('left1'): 
            player.reel('left', 500, [[0, 1], [1, 1]]).animate('left', -1);  
            break;
        case ('right1'): 
            player.reel('right', 500, [[0, 2], [1, 2]]).animate('right', -1);  
            break;
        case ('bottom1'): 
            player.reel('bottom', 500, [[0, 3], [1, 3]]).animate('bottom', -1);  
            break;
    }
    curDir.x = x; curDir.y = y;
}