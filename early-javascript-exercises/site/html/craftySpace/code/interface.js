const INVLINESIZE = 7;

var curInv = [];

function showMap() {
    mapShowed = true;
    Crafty.e('2D, Canvas, mapFone, Tween, map') // карта
        .attr({x: 100, y: 240, w: 900, h: 400});
        
    Crafty.e('2D, Canvas, cancel, Mouse, Tween, map') // кнопка возврата
        .attr({x: 850, y: 300, w: 60, h: 60})
        .bind('Click', closeMap);
    
    Crafty.e('2D, Canvas, alpha, Mouse, Tween, map') 
        .attr({x: 150, y: 290, w: 60, h: 60})
        .bind('Click', function() {travel(1);});
    
    Crafty.e('2D, Canvas, Text, Tween, map') 
        .attr({x: 160, y: 360})
        .textFont({ size: '25px', weight: 'bold', family: 'LM'})
        .text('ALPHA');
    
    Crafty.e('2D, Canvas, beta, Mouse, Tween, map') 
        .attr({x: 350, y: 290, w: 60, h: 60})
        .bind('Click', function() {travel(2);});
    
    Crafty.e('2D, Canvas, Text, Tween, map') 
        .attr({x: 360, y: 360})
        .textFont({ size: '25px', weight: 'bold', family: 'LM'})
        .text('BETA');
    
    Crafty.e('2D, Canvas, gamma, Mouse, Tween, map')
        .attr({x: 150, y: 490, w: 60, h: 60})
        .bind('Click', function() {travel(3);});
    
    Crafty.e('2D, Canvas, Text, Tween, map') 
        .attr({x: 160, y: 560})
        .textFont({ size: '25px', weight: 'bold', family: 'LM'})
        .text('GAMMA');
    
    Crafty.e('2D, Canvas, delta, Mouse, Tween, map') 
        .attr({x: 350, y: 490, w: 60, h: 60})
        .bind('Click', function() {travel(4);});
    
    Crafty.e('2D, Canvas, Text, Tween, map') 
        .attr({x: 360, y: 560})
        .textFont({ size: '25px', weight: 'bold', family: 'LM'})
        .text('DELTA');
    
    Crafty('map').each( function () { this.attr({alpha: 0.0}); });
    Crafty('map').each( function () { this.tween({alpha: 1.0}, 200); });
}

function closeMap() {
    mapShowed = false;
    
    Crafty('map').each( function () { this.tween({alpha: 0.0}, 200); });
    setTimeout(function () { Crafty('map').each(this.destroy); }, 210);
}

function showInv() {
    invOpened = true;
    Crafty.e('2D, Canvas, mapFone, Tween, Inv')
        .attr({x: 100, y: 240, w: 900, h: 400});
    Crafty.e('2D, Canvas, cancel, Mouse, Tween, Inv')
        .attr({x: 850, y: 300, w: 60, h: 60})
        .bind('Click', closeInv);
    
    var colNum = 1, lineNum = 1;
    for (var i = 0; i < curInv.length; i++) {
        if (colNum == INVLINESIZE - 1) {
            colNum = 1;
            lineNum++;
        }
        
        Crafty.e('2D, Canvas, Inv, Mouse, Tween, ' + curInv[i].pic)
            .attr({x: colNum * 120 + 20, y: 220 + lineNum * 90, w: 60, h: 60});
        
                Crafty.e('2D, Canvas, Text, Inv, Tween')
                    .attr({x: colNum * 120 + 20, y: 280 + lineNum * 90})
                    .textFont({ size: '15px', weight: 'bold', family: 'LM'})
                    .text(curInv[i].sign);

        colNum++;
    }   
}

function addToInv(pic, sign) {
    var curElem = {};
    
    curElem.sign = sign;
    curElem.pic = pic;
    
    curInv.push(curElem);
}

function rmvFromInv (pic) {
    var i = 0;
    while (curInv[i].pic != pic) {i++;}
    curInv.splice(i, 1);
}

function closeInv() {
    invOpened = false;
    
    Crafty('Inv').each( function () { this.tween({alpha: 0.0}, 200); });
    setTimeout(function () { Crafty('Inv').each(this.destroy); }, 210);
}


function initPult() {
    pult = Crafty.e('2D, Canvas, pult')
        .attr({w: 600, h: 200, y: window.innerHeight - 200, x: 100});
    Crafty.e('2D, Canvas, pultMap, Mouse')
        .attr({w: 60, h: 60, y: window.innerHeight - 135, x: 390})
        .bind('Click', showMap)
        .bind('MouseOver', function () {
        createHighlight(390, window.innerHeight - 135); 
    })
        .bind('MouseOut', function () {
        removeHighLight();
    });
    Crafty.e("2D, Canvas, Text").attr({x: 403, y: window.innerHeight - 75})
        .textFont({size: '15px', weight: 'bold', family: 'LM'})
        .text('MAP');
}

function createInvButton () {
    Crafty.e('2D, Canvas, pultInv, Mouse')
        .attr({w: 60, h: 60, y: window.innerHeight - 135, x: 450})
        .bind('Click', showInv)
        .bind('MouseOver', function () {
        createHighlight(450, window.innerHeight - 135); 
    })
        .bind('MouseOut', function () {
            removeHighLight();
        });
    Crafty.e("2D, Canvas, Text").attr({x: 443, y: window.innerHeight - 75})
        .textFont({size: '15px', weight: 'bold', family: 'LM'})
        .text('INVENTORY');
}

function createHighlight(x, y) {
    highlight = Crafty.e('2D, Canvas, highlight')
        .attr({h: 60, w: 60, x: x, y: y});
}

function removeHighLight() {
    highlight.destroy();
}

function showUpgradeScreen () {
    if (upgradesReached) {
        Crafty.e('2D, Canvas, mapFone, Tween, upgrades')
            .attr({x: 100, y: 240, w: 900, h: 400});
        
        Crafty.e('2D, Canvas, Color, upgrades, Tween')
            .attr({x: 180, y: 550, h: 40, w: 100})
            .color('grey');
        
        Crafty.e('2D, Canvas, Text, Tween, upgrades')
            .attr({x: 185, y: 560, h: 40, w: 80})
            .textFont({ size: '25px', weight: 'bold', family: 'LM'})
            .text(curMoney);
        
        // а теперь по станциям! на каждой станции игрок может изменить только какой нибудь один параметр корабля, а на какой то - циферки прокачивать
    }
}

function closeUpgradeScreen() {
    Crafty('upgrades').each( function () { this.tween({alpha: 0.0}, 200); });
    setTimeout(function () { Crafty('upgrades').each(this.destroy); }, 210);
}