function moveForces(i, j, dI, dJ, type) {
    switch (type) {
        case 1: chooseAnim('tank', i, j, dI, dJ); cells[dI][dJ].tanks += cells[i][j].tanks; cells[i][j].tanks = 0; setReactor(); break;
        case 2: chooseAnim('soldier', i, j, dI, dJ); cells[dI][dJ].soldiers += cells[i][j].soldiers; cells[i][j].soldiers = 0; setReactor(); break;
        case 3: chooseAnim('helic', i, j, dI, dJ); cells[dI][dJ].helics += cells[i][j].helics; cells[i][j].helics = 0; setReactor(); break;
	}
}

function train(i, j, type) {
	switch(type) {
		case 1:  if (money > 199) {money -= 200; cells[i][j].tanks += 1; animateCell('training', i, j, i, j, 0.4); callCooldowns();}
				 else {insuffMoney()}; break;
		case 2:  if (money > 99) {money -= 100; cells[i][j].soldiers += 1; animateCell('training', i, j, i, j, 0.4); callCooldowns();}
				 else {insuffMoney()}; break;
		case 3:  if (money > 299) {money -= 300; cells[i][j].helics += 1; animateCell('training', i, j, i, j, 0.4); callCooldowns();}
				 else {insuffMoney()}; break;
	}
}

function trainForces() {
	clearInterval(statsUpdate);
	$('#reactor').html("<div class='cell margin highlight' onclick='train(curI, curJ, 1)'><img src='src/tank.png'><p>200 credits</p></div><div class='cell margin highlight' onclick='train(curI, curJ, 2)'><img src='src/soldat.png'><p>100 credits</p></div><div class='cell margin highlight' onclick='train(curI, curJ, 3)'><img src='src/helic.png'><p>300 credits</p></div><button class='recBtn' onclick='setReactor()'>Return</button>")
}

function sendForces(dI, dJ) {
	var dI = curI + dI; var dJ = curJ + dJ;
	clearInterval(statsUpdate);
	
	if ((dI > 0)&&(dI < FIELDHEIGHT + 1)&&(dJ > 0)&&(dJ < FIELDWIDTH + 1)) {
		$('#reactor').html("<div class='cell margin highlight' onclick='checkIfOurCell(" + curI + ', ' + curJ + ', ' + dI + ', ' + dJ + ', ' + 1 + ")'><img src='src/tank.png'> Send tanks</div><div class='cell margin highlight' onclick='checkIfOurCell(" + curI + ', ' + curJ + ', ' + dI + ', ' + dJ + ', ' + 2 + ")'><img src='src/soldat.png'>Send soldiers</div><div class='cell margin highlight' onclick='checkIfOurCell(" + curI + ', ' + curJ + ', ' + dI + ', ' + dJ + ', ' + 3 + ")'><img src='src/helic.png'>Send helicopters</div><button class='recBtn' onclick='setReactor()'>Return</button>");
	}
	else {
		document.getElementById('reactor').innerHTML = "<p class='text'>А такой клетки не существует!</p><button class='recBtn' onclick='setReactor()'>Return</button>"
	}
}

function checkIfOurCell(i, j, dI, dJ, type) {
	if (cells[dI][dJ].our) {
		moveForces(i, j, dI, dJ, type);
	} else {
		attackCell(i, j, dI, dJ, type);
	}
}

function attackCell(i, j, dI, dJ, type) {
	switch (type) {
		case 1: chooseAnim('tank', i, j, dI, dJ); var am = cells[i][j].tanks; var CURVALUE =TANKVALUE; var def = cells[dI][dJ].tanks; cells[i][j].tanks = 0; break;
		case 2: chooseAnim('soldier', i, j, dI, dJ); var am = cells[i][j].soldiers; var CURVALUE = SOLDVALUE; var def = cells[dI][dJ].soldiers; cells[i][j].soldiers = 0; break;
		case 3: chooseAnim('helic', i, j, dI, dJ); var am = cells[i][j].helics; var CURVALUE = HELVALUE; var def = cells[dI][dJ].helics; cells[i][j].helics = 0; break;
	};
	
	if (am - 1 < def) {
		def -= am;
		am = 0;
	}
	else {
		am -= def;
		def = 0;
	};
	
	var tEf = CURVALUE * am;
	
	if (((type == 1)&&(cells[dI][dJ].surface == 'forest'))
	  ||((type == 2)&&(cells[dI][dJ].surface == 'field'))
	  ||((type == 3)&&(cells[dI][dJ].surface == 'rock'))) 
				{tEf *= 5};
	
	switch (type) {
		case 1: cells[dI][dJ].tanks = def; break;
		case 2: cells[dI][dJ].soldiers = def; break;
		case 3: cells[dI][dJ].helics = def; break;
	};
	am -= (cells[dI][dJ].points / CURVALUE);
	cells[dI][dJ].points -= tEf;
	
	if (cells[dI][dJ].points < 1) {captureCell(true, dI, dJ)};	
	
	setTimeout(setReactor, 100);
}

function captureCell(ifOur, i, j) {
	cells[i][j].our = ifOur;
	cells[i][j].tanks = 2;
	cells[i][j].soldiers = 5;
	cells[i][j].helics = 0;
	cells[i][j].points = 100;
	
	setTimeout(function () {animateCell('capturing', i, j, i, j, 0.4)}, 100);
	
	if (ifOur){
        natureCells--; if (natureCells == 0) {showGameEnd('Hey guy, you have captured this sector! Greetings!');}
		setTimeout(function() {document.getElementById('c' + i + j).innerHTML = '<img src=\'src/dust.gif\'>';}, 1800);
	} else {
        natureCells++; if (natureCells == 30) {showGameEnd('Unfortunately, game is over. Press F5 to play one more time!');}
        cells[i][j].building = 'nature';
		var tanks = 0, soldiers = 0, helics = 0;
        if (cells[i][j].surface == 'forest') {
			tanks = 5; soldiers = 2; setTimeout(function() {$('#c' + i + j).html('<img src=\'src/forest.gif\'>');}, 1800);
		} else if (cells[i][j].surface == 'field') {
			tanks = 2; soldiers = 5; setTimeout(function() {$('#c' + i + j).html('<img src=\'src/field.gif\'>');}, 1800);
		} else {
			soldiers = 2; helics = 5; setTimeout(function() {$('#c' + i + j).html('<img src=\'src/rock.gif\'>');}, 1800);
		};
		cells[i][j].tanks = tanks;
		cells[i][j].soldiers = soldiers;
		cells[i][j].helics = helics;
        setTimeout(setReactor, 1850); // задержка перед обновлением
	}
}

function launchRocket() {
    showCoordinates();
    $('#reactor').html('First of all - launching the rocket costs 300 credits! <br> Set the X-coordinate (vertical side): <input id="targI" class="swift" type="text"> <br> Set the Y-coordinate (horizontal side): <input id="targJ" class="swift" type="text"> <br> <button class="recBtn" onclick="checkInput()">Launch!</button><button class="recBtn" onclick="setReactor()">Return</button>');
}

function checkInput () {
    var targI = document.getElementById('targI').value;
    var targJ = document.getElementById('targJ').value;
    
    if ((targI > 0)&&(targI <= FIELDHEIGHT)&&(targJ > 0)&&(targJ <= FIELDWIDTH)) {
       animateDwarfShoot(curI, curJ, targI, targJ); 
    } else {
        document.getElementById('targI').value = 'UNCORRECT SETTINGS';
        document.getElementById('targJ').value = 'UNCORRECT SETTINGS';
        $('input').css('box-shadow', '0px 0px 20px #FF2800');
        setTimeout("$('input').css('box-shadow', '0px 0px 0px #FF2800')", 1000);
        setTimeout("document.getElementById('targI').value = ''", 1200);
        setTimeout("document.getElementById('targJ').value = ''", 1200);
    }
}