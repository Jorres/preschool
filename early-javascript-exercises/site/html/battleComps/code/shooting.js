const BULLETSPEED = 0.5, TIMEK = 6, BULLETCSPEED = 80;

function dist(x1, y1, x2, y2) { return (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))); } 

function shootSingleBullet(shooter, target, whomToCheck, bulletType, color) {
    var shootTime = dist(shooter.x, shooter.y, target.x, target.y) * TIMEK;
    
    var targX = target.x + Crafty.math.randomInt(-80, 80);
    var targY = target.y + Crafty.math.randomInt(-80, 80);

    var bullet = Crafty.e('2D, Canvas, Color, Tween, Collision, ' + bulletType)
        .attr({x: shooter.x + 5, y: shooter.y + 5, w: 6, h: 6})
        .color(color)
        .collision()
        .checkHits(whomToCheck)
        .bind('EnterFrame', function () {
            this.x += (targX - shooter.x) / BULLETCSPEED;
            this.y += (targY - shooter.y) / BULLETCSPEED;
        })
        .bind('HitOn', function () {
            this.destroy();
        });
    
        bullet._globalZ = 0;
    
    setTimeout(function () {
        bullet.destroy();
    }, shootTime)
}