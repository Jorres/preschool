function animateCell(action, i, j, dI, dJ, duration) {
	parent = document.getElementById("map");		
	var anim = document.createElement("div");
	parent.insertBefore(anim, null);
		
	anim.style.position = "absolute";
	anim.style.top = (i - 1) * 104  + 2 + "px";
	anim.style.left = (j - 1) * 104 + 2 + "px";
	anim.innerHTML = "<img src='src/" + action + ".gif'>";
	anim.style.transition = duration + 's ease-in-out 0s';
	
	setTimeout(function() {anim.style.transform = 'translate3d(' + (dJ - j) * 104 + 'px, ' + (dI - i) * 104 + 'px, 0px)';}, 10);
	setTimeout(function() {anim.style.opacity = "0";}, 1200);
	setTimeout(function() {anim.parentNode.removeChild(anim)}, 1800);
}

function chooseAnim(type, i, j, dI, dJ) {
	 if ((dI - i == 1)&&(dJ - j == 0)) {animateCell(type + 'Marchdown', i, j, dI, dJ, 0.4)}
else if ((dI - i == -1)&&(dJ - j == 0)) {animateCell(type + 'Marchup', i, j, dI, dJ, 0.4)}
else if ((dI - i == 0)&&(dJ - j == 1)) {animateCell(type + 'Marchright', i, j, dI, dJ, 0.4)}
else if ((dI - i == 0)&&(dJ - j == -1)) {animateCell(type + 'Marchleft', i, j, dI, dJ, 0.4)}
}

function insuffMoney() {
		$('.margin').css('box-shadow', '0px 0px 20px #FF2800');
		setTimeout(function() {$('.margin').css('box-shadow', '')}, 700)
}

function callCooldowns() {	
	$('.margin').css('background-color', 'grey');
	$('.margin').css('box-shadow', '0px 0px 40px grey');
	
	setTimeout(function () {
		$('.margin').css('background-color', '');
		$('.margin').css('box-shadow', '');
	}, 2000);
}

function showNews() {
	$('#news').css('opacity', '1');
    isBuiltNewsStation = true;
	addNewNotice('Hello! You have succesfully built the news station!');
}

function addNewNotice(text) {
	$('#n4>p').css('opacity', '0');
	$('#n3>p').css('opacity', '0');
	$('#n2>p').css('opacity', '0');
	$('#n1>p').css('opacity', '0');
	setTimeout(function() {$('#n4').html($('#n3').html())}, 300);
	setTimeout(function() {$('#n3').html($('#n2').html())}, 300);
	setTimeout(function() {$('#n2').html($('#n1').html())}, 300);
	setTimeout(function() {$('#n1').html('<p class=\'swift\'>' + text + '</p>')}, 300);
	setTimeout(function() {$('#n4>p').css('opacity', '1')}, 300);
	setTimeout(function() {$('#n3>p').css('opacity', '1')}, 300);
	setTimeout(function() {$('#n2>p').css('opacity', '1')}, 300);
	setTimeout(function() {$('#n1>p').css('opacity', '1')}, 300);
}

function initPause() {
    if (isGoing) {
        $('#pause').css('background', 'url(src/play.png)');
        clearTimeout(mainGameTimer);
        isGoing = false;
        $('#reactor').html('<p>GAME IS PAUSED!<p>');
    } else {
        $('#pause').css('background', 'url(src/pause.png)');
        mainGameTimer = setTimeout(mainGameLoop, 1000);
        setReactor();
    }
}

function developRepairKit() {
    if (money >= 100) {
        animateCell('training', curI, curJ, curI, curJ, 0.4);
        money -= 100;
        totalRepairKits += 1;
        $('#repairKits').html("<img src='src/hammer.png'>" + totalRepairKits);
    }
}

function showCoordinates() {
    $('#Icoord').css('opacity', '1');
    $('#Ycoord').css('opacity', '1');
}

function hideCoordinates() {
    $('#Icoord').css('opacity', '0');
    $('#Ycoord').css('opacity', '0');
}

function animateDwarfShoot(i, j, dI, dJ) {
    //animateCell('smoke', i, j, i, j, 0.4);
    if (money >= 300) {
        animateCell('rocketUp', i, j, -5, j, 2);
        setTimeout(animateCell, 3000, 'rocketDown', -10, dJ, dI, dJ, 2);
        setTimeout(animateCell, 4750, 'capturing', dI, dJ, dI, dJ, 0.4);
        money -= 300;
        cells[dI][dJ].points -= 10;
        if (cells[dI][dJ].points < 1) {setTimeout(captureCell, 4750, true, dI, dJ);}
    } else {
        document.getElementById('targI').value = 'INSUFFICIENT MONEY';
        document.getElementById('targJ').value = 'INSUFFICIENT MONEY';
        $('input').css('box-shadow', '0px 0px 20px #FF2800');
        setTimeout("$('input').css('box-shadow', '0px 0px 0px #FF2800')", 1000);
        setTimeout("document.getElementById('targI').value = ''", 1200);
        setTimeout("document.getElementById('targJ').value = ''", 1200);
    }
}

function showGameEnd(text) {
    clearTimeout(mainGameTimer);
    for (i = 1; i <= FIELDHEIGHT; i++) {
        for (j = 1; j<= FIELDWIDTH; j++) {
            animateCell('capturing', i, j, i, j);
        };
        
        $('#gameEnder').css('transform', 'translate3d(0px, 2000px, 0px)');
        $('#gameEnder').html(text);
    }
}