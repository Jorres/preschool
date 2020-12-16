var maincolor; 
var colors = [];
var total = 0;
var wrong = 10;
var MIDDLEBRIGHT = parseInt('999999', 16);

function CheckCell(el) {
        if (el.clr == maincolor) {
                alert('Круто! погнали дальше');
            total++;
        }
        else {  
            wrong--;
        }
    
        if (el.isDark)
            document.body.style.color = 'white';
        else
            document.body.style.color = 'black';
    
        document.body.style.backgroundColor = GetColor(el.clr);
        
    
        if (wrong == 0) {
            alert('Луууузеееееер. Играй заново, но так и быть, оставим фон за труды');
            wrong = 10;
            total = 0;
            GenerateTable(2);
        }
        else if (total > 150) {
            alert('Ну ты даешь!!! А еще раз слабо?');
            total = 0;
            GenerateTable(2);
        }
        else   
            GenerateTable(Math.floor(total / 5) + 2);
}

function GetColor(n) {
    var s = n.toString(16);
    for (var i = s.length; i < 6; i++)
            s = '0' + s;
    return '#' + s;
}

function SetColors(cnt) {
    for(var i = 0; i < cnt*cnt; i++)
        colors[i] = GetRandom(16*16*16*16*16*16);
}

function GetRandom(n) {
    return Math.floor(Math.random() * n);
}

function GenerateTable(cnt) {
    document.getElementById('score').innerHTML = total;
    document.getElementById('wrongs').innerHTML = wrong;
    
    SetColors(cnt);
    maincolor = colors[GetRandom(cnt*cnt)];
    document.getElementById('color').innerHTML = GetColor(maincolor);
    
    var blockClone;
    var block = document.createElement('div');
    var parent = document.getElementById('table');
    parent.innerHTML = '';

    var mar = 2;
    var w = 500 / cnt - 2*mar; 

    block.className = 'cell';
    block.style.width = w + 'px';
    block.style.height = w + 'px';
    block.style.margin = mar + 'px';
    block.clr = '';
    block.isDark = true;
    

    for(var i = 0; i < cnt*cnt; i++) {
        blockClone = block.cloneNode(true);
        var color = colors[i];
        blockClone.style.backgroundColor = GetColor(color);
        
        blockClone.clr = color;
        blockClone.isDark = (color < MIDDLEBRIGHT);
        
        blockClone.onclick = function() {CheckCell(this);};    
        parent.insertBefore(blockClone, parent.lastChild);        
    }
}

GenerateTable(2);
