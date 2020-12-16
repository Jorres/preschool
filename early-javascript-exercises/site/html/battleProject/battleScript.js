var blueHP = redHP = 1000;
var isYourTurn = 1;
var effKnight, effWizard, effArcher, effAlchemist, attacker;
var sunny = ["sunny.gif", 100, 100, 100, 100];
var windy = ["windy.gif", 100, 30, 120, 50];
var stormy = ["stormy.gif", 80, 10, 200, 40];
var moody = ["moody.gif", 100, 120, 100, 40];
var state;


function attack(x, eff) {
	isYourTurn = 0;
	document.getElementById(x).style.transform = 'translate3d(240px, 0px, 0px)';
	redHP -= eff;
	document.getElementById('redHP').innerHTML = redHP;
	
	setTimeout("document.getElementById('" + x + "').style.transform = 'translate3d(0px, 0px, 0px)';", 1000);	
	setTimeout("redAttack()", 1500);	
}

function redAttack() {
	temp = Math.floor(Math.random() * 4) + 1;  // а тут мог бы быть умный игрок....
	switch (temp) {
		case (1): attacker = 'rAlchemist'; break;
		case (2): attacker = 'rArcher'; break;
		case (3): attacker = 'rWizard'; break;
		case (4): attacker = 'rWarrior'; break;}; 
	document.getElementById(attacker).style.transform = 'translate3d(-240px, 0px, 0px)';
	setTimeout("document.getElementById(attacker).style.transform = 'translate3d(0px, 0px, 0px)';", 1000);
	blueHP -= state[temp];
	document.getElementById('blueHP').innerHTML = blueHP;
	if (blueHP <= 0) {
		document.getElementById('window').innerHTML = "<p> Игра окончена! Вы проиграли и отступаете!</p>";		
	} else if (redHP <= 0) {
		document.getElementById('window').innerHTML = "<p> Игра окончена! Вы одержали победу!</p>";	
	} else {setTimeout("generateConds()", 1000);}
}

function generateConds() {
	temp = Math.floor(Math.random() * 5);
	switch(temp) {
		case(1): state = sunny; break;
		case(2): state = windy; break;
		case(3): state = stormy; break; 
		case(4): state = moody; break;
	};
	effAlchemist = state[1];
	effArcher = state[2];
	effWizard = state[3];
	effKnight = state[4];
	document.getElementById("battleView").style.background = 'url(peysages/' + state[0] + ')';
	isYourTurn = 1;
}

setTimeout("generateConds()", 200);