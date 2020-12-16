var townCoord = new Array();

function initTown() {
		for (var i = 0; i <= 13; i++) {
			townCoord[i] = new Array();
		for (var j = 0; j <= 10; j++) {
				townCoord[i][j] = 5;
			}
		};
		initLoop(1, 12, 1, 9, 0, townCoord);
		initLoop(9, 10, 1, 3, 5, townCoord);
		initLoop(5, 6, 1, 3, 5, townCoord);
		initLoop(6, 8, 6, 8, 5, townCoord);
		initLoop(1, 3, 3, 7, 5, townCoord);
		townCoord[13][5] = 1;
		townCoord[4][5] = 2;
	}



function intoTown() {
	initTown();
	HeroX = 13;
	HeroY = 5;
	Dx = Ux = Ly = Ry = CurX = CurY = 0;
	document.getElementById('townHolder').style.transform = 'translate3d(0px, 1020px, 0px)';
	document.getElementById('shadow').style.opacity = '0';
	document.getElementById('company').style.top = '377px';
}

function outOfTown() {
	document.getElementById('townHolder').style.transform = 'translate3d(0px, 0px, 0px)';
	document.getElementById('shadow').style.opacity = '0';
	document.getElementById('company').style.top = '365px';
	HeroX = HeroY = 17;
	Dx = Ry = movingMap = 1;
	Ly = Ux = -1;
	CurX = CurY = 90;
}