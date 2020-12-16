var G1 = G2 = G3 = G4 = G5 = G6 = isJava = isKnight = atFirstColeader = hasSandShip = 0;
var coord = new Array();
var HeroX = HeroY = 18;
var isOverworld = 1;
var currentQuest = '';
var questTurn = 0;
var isInTown = 0;
var curPlayer = 'colfront';
var key;

	function clearCoordinates () {
		for (var i = 0; i < 41; i++) {
			coord[i] = new Array();
		for (var j = 0; j < 41; j++) {
				coord [i][j] = 0;
			}
		}
	}

	var CorY = CorX = 0;
	var CorXpx, CorYpx;
	
	function destCorovan() {
		var dest = Math.floor(Math.random() * 4);
		if ((HeroX != CorX)&&(HeroY != CorY)) {
			if (dest == 1){
					if ((coord[CorX][CorY + 1] != 5)&&(CorY <= 37)) {
							CorY += 1;
							document.getElementById('corovan').innerHTML = "<img src='sands/colsprites/corovan/korovanfront.gif'>";
					}
			} else if (dest == 2) {
					if ((coord[CorX + 1][CorY] != 5)&&(CorX <= 37)) {
							CorX += 1;
							document.getElementById('corovan').innerHTML = "<img src='sands/colsprites/corovan/korovanright.gif'>";
					}
			} else if (dest == 3) {
					if ((coord[CorX][CorY - 1] != 5)&&(CorY >= 2)) {
							CorY -= 1;
							document.getElementById('corovan').innerHTML = "<img src='sands/colsprites/corovan/korovanback.gif'>";
					}
			} else if (dest == 4) {
					if ((coord[CorX - 1][CorY] != 5)&&(CorX >= 2)) {
							CorX -= 1;
							document.getElementById('corovan').innerHTML = "<img src='sands/colsprites/corovan/korovanleft.gif'>";
					}
			}
		};
		CorXpx = CorX * 90;
		CorYpx = CorY * 90;
		document.getElementById('corovan').style.transform = "translate3d(" + CorXpx + "px, " + CorYpx + "px, 0px)";
	};
	
	addEventListener('keyup', initMove);
	var Dx = Ux = Ly = Ry = CurX = CurY = 0;
	
	function initMove(event) {
		key = event.keyCode;
		if (isInTown) {
			pressArrow(key, "townMap", townCoord);
		} else {
			pressArrow(key, "map", coord);
		}
	}
	
	
	function pressArrow(key, typeMap, array) {
		var worm = Math.floor(Math.random() * 350);
		
		function checkTurn() {
			if ((worm == 175)&&(hasSandShip == 0)&&(isInTown == 0)) {eatHero();};
				if (checkDanger()) {
					checkMovedEarth();							
				} else {
					doDeath();
				} 
		}
		
		if (movingMap) {
			switch(key) {
				case (38):
					if ((Dx < 18) && (array[HeroX - 1][HeroY] != 5)){
					HeroX -= 1;
					Dx += 1;
					Ux -= 1;
					CurX += 90;
					document.getElementById(typeMap).style.transform = "translate3d(" + CurY + "px, " + 90 * Dx + "px, 0px)";
					if (hasSandShip) {
						document.getElementById("hero").innerHTML = "<img src='sands/colsprites/sandship/sandshipback.gif'>";
					} else {
						document.getElementById("hero").innerHTML = "<img src='sands/colsprites/colback.gif'>";
					};
					if ((isJava)&&(hasSandShip == 0)) {
					document.getElementById("hireman").innerHTML = "<img src='sands/colsprites/java/javaback.gif'>";} else	
					if ((isKnight)&&(hasSandShip == 0)) {
					document.getElementById("hireman").innerHTML = "<img src='sands/colsprites/knight/knightback.gif'>";}
					checkTurn();
					}
				break;
				case (40):
					if ((Ux < 21) && (array[HeroX + 1][HeroY] != 5)){
					HeroX += 1;
					Ux += 1;
					Dx -= 1;
					CurX -= 90;
					document.getElementById(typeMap).style.transform = "translate3d(" + CurY + "px, " + -90 * Ux + "px, 0px)";
					if (hasSandShip) {
						document.getElementById("hero").innerHTML = "<img src='sands/colsprites/sandship/sandshipfront.gif'>";
					} else {
						document.getElementById("hero").innerHTML = "<img src='sands/colsprites/"+ curPlayer +".gif'>";
					};
					if ((isJava)&&(hasSandShip == 0)) {
					document.getElementById("hireman").innerHTML = "<img src='sands/colsprites/java/javafront.gif'>";} else
					if ((isKnight)&&(hasSandShip == 0)) {
					document.getElementById("hireman").innerHTML = "<img src='sands/colsprites/knight/knightfront.gif'>";}
					checkTurn();
					}
				break;
				case (39):
					if ((Ly < 21) && (array[HeroX][HeroY + 1] != 5)){
					HeroY += 1;
					Ly += 1;
					Ry -= 1;
					CurY -= 90;
					document.getElementById(typeMap).style.transform = "translate3d(" + -90 * Ly + "px, " + CurX + "px, 0px)";
					if (hasSandShip) {
						document.getElementById("hero").innerHTML = "<img src='sands/colsprites/sandship/sandshipright.gif'>";
					} else {
						document.getElementById("hero").innerHTML = "<img src='sands/colsprites/colright.gif'>";
					};
					if ((isJava)&&(hasSandShip == 0)) {
					document.getElementById("hireman").innerHTML = "<img src='sands/colsprites/java/javaright.gif'>";} else
					if ((isKnight)&&(hasSandShip == 0)) {
					document.getElementById("hireman").innerHTML = "<img src='sands/colsprites/knight/knightright.gif'>";}
					checkTurn();
					}
				break;
				case (37):
					if ((Ry < 18) && (array[HeroX][HeroY - 1] != 5)){
					HeroY -= 1;
					Ry += 1;
					Ly -= 1;
					CurY += 90;
					document.getElementById(typeMap).style.transform = "translate3d(" + 90 * Ry + "px, " + CurX + "px, 0px)";
					if (hasSandShip) {
						document.getElementById("hero").innerHTML = "<img src='sands/colsprites/sandship/sandshipleft.gif'>";
					} else {
						document.getElementById("hero").innerHTML = "<img src='sands/colsprites/colleft.gif'>";
					};
					if ((isJava)&&(hasSandShip == 0)) {
					document.getElementById("hireman").innerHTML = "<img src='sands/colsprites/java/javaleft.gif'>";} else
					if ((isKnight)&&(hasSandShip == 0)) {
					document.getElementById("hireman").innerHTML = "<img src='sands/colsprites/knight/knightleft.gif'>";}
					checkTurn();	
					}
				break;
				case (69): // e
					if (hasSandShip) {
						hasSandShip = 0;
						initLoop(HeroX, HeroX + 1, HeroY, HeroY + 1, 9, coord);
						document.getElementById('company').style.top = '365px';
						document.getElementById('company').style.left = '452px';
						document.getElementById('hero').innerHTML = "<img src='sands/colsprites/colfront.gif'>";
						if (isJava) {
						document.getElementById("hireman").innerHTML = "<img src='sands/colsprites/java/javafront.gif'>";} else
						if (isKnight) {
						document.getElementById("hireman").innerHTML = "<img src='sands/colsprites/knight/knightfront.gif'>";}
						document.getElementById("sandship0").style.opacity = "1";
						document.getElementById("sandship0").style.top = HeroX * 90 + 'px';
						document.getElementById("sandship0").style.left = HeroY * 90 + 'px';
						document.getElementById("sandship0").innerHTML = "<img src='sands/colsprites/sandship/sandshipstop.png'>";
					};
				break;
				
				default:
				break;
			}
		}
	}
	
	
	function checkPlacement(x, y) {
		if ((coord[x][y] == 0)&&(coord[x + 2][y] == 0)&&(coord[x][y + 2] == 0)&&(coord[x + 2][y + 2] == 0)) {
			return (1);
		} else {return (0);}
	}
	
	function initEarthMap() {
		parent = document.getElementById("map");
		var i = 0;
		
		guild = document.createElement("div");
		parent.insertBefore(guild, null);	
		initLoop(11, 16, 14, 19, 5, coord);
		guild.style.position = "absolute";
		guild.style.top = "980px";
		guild.style.left = "1230px";
		guild.innerHTML = "<img src='sands/colsprites/guild2.png'>";
		
		quester = document.createElement("div");
		parent.insertBefore(quester, null);
		coord[17][16] = 10;
		quester.id = 'mapquester';
		document.getElementById('mapquester').innerHTML = "<img src='sands/quests/mapguard.gif'>";
		document.getElementById('mapquester').style.top = '1487px';
		document.getElementById('mapquester').style.left = '1445px';
		
		
		while (i < 1) {
			x = Math.floor(Math.random() * 32) * 90 + 100;
			y = Math.floor(Math.random() * 32) * 90 + 100;
			Cx = Math.floor(x / 90);
			Cy = Math.floor(y / 90);
			if (checkPlacement(Cx, Cy)) {
				frts = document.createElement("div");
				parent.insertBefore(frts, null);	
				initLoop(Cx, Cx + 2, Cy, Cy + 2, 5, coord);
				coord[Cx + 2][Cy + 1] = 2;
				frts.innerHTML = "<img src='sands/colsprites/fortress.gif'>";
				frts.style.position = 'absolute';
				frts.style.top = x + 'px';
				frts.style.left = y + 'px';
			} else {
				i -= 1;
			};
			i += 1;
		};
		
		i = 0;
		
		while (i < 1) {
			x = Math.floor(Math.random() * 32) * 90 + 100;
			y = Math.floor(Math.random() * 32) * 90 + 100;
			Cx = Math.floor(x / 90);
			Cy = Math.floor(y / 90);
			if (checkPlacement(Cx, Cy)) {
				tent = document.createElement("div");
				parent.insertBefore(tent, null);	
				initLoop(Cx, Cx + 3, Cy, Cy + 3, 3, coord);
				tent.innerHTML = "<img src='sands/colsprites/tent.png'>";
				tent.style.position = 'absolute';
				tent.style.top = x + 'px';
				tent.style.left = y + 'px';
			} else {
				i -= 1;
			};
			i += 1;
		};
		
		i = 0;
		
		while (i < 0) {
			x = Math.floor(Math.random() * 32) * 90 + 90;
			y = Math.floor(Math.random() * 32) * 90 + 90;
			Cx = Math.floor(x / 90);
			Cy = Math.floor(y / 90);
			var range = Math.floor(Math.random() * 3) + 2; 
			if (checkPlacement(Cx, Cy)) {
				initLoop(Cx - range, Cx + 2 + range, Cy - range, Cy + 3 + range, 6, coord);
				initLoop(Cx, Cx + 2, Cy, Cy + 1, 5, coord);
				tower = document.createElement("div");
				parent.insertBefore(tower, null);	
				tower.innerHTML = "<img src='sands/colsprites/tower.gif'>";
				tower.style.position = 'absolute';
				tower.style.top = x + 'px';
				tower.style.left = y + 'px';
			} else {
				i -= 1;
			};
			i += 1;
		};
		
		i = 0;
		
		while (i <= 5) {
			x = Math.floor(Math.random() * 32) * 90 + 90;
			y = Math.floor(Math.random() * 32) * 90 + 90;
			Cx = Math.floor(x / 90);
			Cy = Math.floor(y / 90);
			if (coord[Cx][Cy] == 0) {
				tempID = 'grass' + i;
				coord[Cx][Cy] = 4;
				grass = document.createElement("div");
				parent.insertBefore(grass, null);	
				grass.id = tempID;
				document.getElementById(tempID).innerHTML = "<img src='sands/mapInteractive/grass" + i % 3 + ".png'>";
				document.getElementById(tempID).style.position = 'absolute';
				document.getElementById(tempID).style.opacity = '0';
				document.getElementById(tempID).style.top = x + 'px';
				document.getElementById(tempID).style.left = y + 'px';
			} else {
				i -= 1;
			};
			i += 1;
		};
		i = 0;
		
		while (i < 1) {
			x = Math.floor(Math.random() * 32) * 90 + 90;
			y = Math.floor(Math.random() * 32) * 90 + 90;
			Cx = Math.floor(x / 90);
			Cy = Math.floor(y / 90);
			if (isOverworld == 0) {
				HeroX = Cx + 1;
				HeroY = Cy + 1;
			};
			if (checkPlacement(Cx, Cy)) {
				initLoop(Cx, Cx + 1, Cy, Cy + 1, 7, coord);
				hole = document.createElement("div");
				parent.insertBefore(hole, null);	
				hole.innerHTML = "<img src='sands/mapInteractive/hole.png'>";
				hole.style.position = 'absolute';
				hole.style.top = x + 'px';
				hole.style.left = y + 'px';
			} else {
				i -= 1;
			};
			i += 1;
		};
		
		i = 0;
		
		while (i < 1) {
			x = Math.floor(Math.random() * 32) * 90;
			y = Math.floor(Math.random() * 32) * 90;
			Cx = Math.floor(x / 90);
			Cy = Math.floor(y / 90);
			if (checkPlacement(Cx, Cy)) {
				tempID = 'sandship' + i;
				initLoop(Cx, Cx + 1, Cy, Cy + 1, 9, coord);
				sandship = document.createElement("div");
				parent.insertBefore(sandship, null);	
				sandship.id = tempID;
				document.getElementById(tempID).innerHTML = "<img src='sands/colsprites/sandship/sandshipbroken.png'>";
				document.getElementById(tempID).style.position = 'absolute';
				document.getElementById(tempID).style.top = x + 'px';
				document.getElementById(tempID).style.left = y + 'px';
			} else {
				i -= 1;
			};
			i += 1;
		};
	}
	
	function initDungeMap() {
		clearCoordinates();
		isOverworld = 0;
		document.getElementById('map').innerHTML = "";
		clearInterval(corovanTimer);
		parent = document.getElementById("map");
		var i = 0;		
		stairs = document.createElement("div");
		parent.insertBefore(stairs, null);	
		coord[18][17] = 8;
		stairs.innerHTML = "<img src='sands/colsprites/stairs.png'>";
		stairs.style.position = 'absolute';
		stairs.style.top = '1530px';
		stairs.style.left = '1530px';
		
		while (i < 6) {
			x = Math.floor(Math.random() * 32) * 90 + 90;
			y = Math.floor(Math.random() * 32) * 90 + 90;
			Cx = Math.floor(x / 90);
			Cy = Math.floor(y / 90);
			if (coord[Cx][Cy] == 0) {
				tempID = 'grass' + i;
				coord[Cx][Cy] = 4;
				grass = document.createElement("div");
				parent.insertBefore(grass, null);	
				grass.id = tempID;
				document.getElementById(tempID).innerHTML = "<img src='sands/mapInteractive/grass" + ((i % 3) + 3) + ".png'>";
				document.getElementById(tempID).style.position = 'absolute';
				document.getElementById(tempID).style.opacity = '0';
				document.getElementById(tempID).style.top = x + 'px';
				document.getElementById(tempID).style.left = y + 'px';
			} else {
				i -= 1;
			};
			i += 1;
		};
		i = 0;
		
		HeroX = HeroY = 18;
		Dx = Ux = Ly = Ry = CurX = CurY = 0;
		document.getElementById('map').style.transform = 'translate3d(0px, 0px, 0px)';
		document.getElementById('map').style.background = 'url(sands/caveBg.png)';
		document.getElementById('mapHolder').style.background = 'url(sands/caveBg.png)';
		document.getElementById('hero').innerHTML = "<img src='sands/colsprites/colfront.gif'>";
		document.getElementById('shadow').style.opacity = '0';
	}
	
	function checkGrass() {
		if (coord[HeroX][HeroY] == 4) {
				var temp = checkGrassID(HeroX * 90, HeroY * 90);
				if (isOverworld) {
					if (temp % 3 == 0) {
						G1 += 1;
					} else if (temp % 3 == 1) {
						G2 += 1;
					} else if (temp % 3 == 2){
						G3 += 1;
					}
				} else {
					if (temp % 3 == 0) {
						G4 += 1;
					} else if (temp % 3 == 1) {
						G5 += 1;
					} else if (temp % 3 == 2){
						G6 += 1;
					}
				}
				document.getElementById('grass' + temp).style.display = 'none';
				if (hasSandShip) {
					document.getElementById('hero').innerHTML = "<img src='sands/colsprites/sandshipcolbrew.png'>";
				} else {
					document.getElementById('hero').innerHTML = "<img src='sands/colsprites/colbrew.gif'>";
				}
		}
	}
		
	
	function interact() {
		if (coord[HeroX][HeroY] != 0) {
			if (coord[HeroX][HeroY] == 3) {
				document.getElementById('reactor').innerHTML = "<button id='newColGame' class='buttons' onclick='hire(1)'>Нанять яву в попутчики!</button><p>Здравствуй, человек! Готов отправиться с тобой в путешествие всего за пару целебных корешков! </p><img src='sands/colsprites/java/javatalk.gif'>";
				document.getElementById('reactor').style.transform = 'translate3d(0px, 840px, 0px)';
			} else if (coord[HeroX][HeroY] == 2) {
				document.getElementById('reactor').innerHTML = "<button id='newColGame' class='buttons' onclick='hire(2)'>Нанять рыцаря в попутчики!</button><p>Охохо! Мой меч скучает по приключениям! Я с радостью пойду за тобой, милорд!</p><img src='sands/colsprites/knight/knighttalk.png'>";
				document.getElementById('reactor').style.transform = 'translate3d(0px, 840px, 0px)';
			} else if (coord[HeroX][HeroY] == 7) {
				document.getElementById('shadow').style.opacity = '1';
				setTimeout("initDungeMap()", 1500);
			} else if (coord[HeroX][HeroY] == 8) {
				document.getElementById('shadow').style.opacity = '1';
				setTimeout("returnToEarth()", 1500);
			} else if (coord[HeroX][HeroY] == 9) {
			var tempy = parseInt(document.getElementById('sandship0').style.left) / 90 + 1;
			var tempx = parseInt(document.getElementById('sandship0').style.top) / 90 + 1;
			initLoop(tempx, tempy, tempx + 1, tempy + 1, 0, coord);
				document.getElementById('sandship0').style.opacity = '0';
				document.getElementById('hireman').innerHTML = '';
				hasSandShip = 1;
				document.getElementById("company").style.top = "300px";
				document.getElementById("company").style.left = "400px";
				document.getElementById("hero").innerHTML = "<img src='sands/colsprites/sandship/sandshipright.gif'>";
				document.getElementById('reactor').innerHTML = "<p>Молодец! Теперь ты владеешь этим транспортным средством. Теперь ты можешь всегда оставить его, нажав кнопку 'E'!</p><button class='buttons' onclick='kingAway()'>Вернуться к игре!</button>";
				document.getElementById('reactor').style.transform = 'translate3d(0px, 820px, 0px)';
			}
		};
		checkQuest();		
	}
	
	function returnToEarth() {
		clearCoordinates();
		document.getElementById('map').innerHTML = "<div id='corovan'><img src='sands/colsprites/corovan/korovanright.gif'></div>";
		initEarthMap();
		isOverworld = 1;
		document.getElementById('map').style.transform = "translate3d(" + (90 * (18 - HeroY)) + "px, " + (90 * (18 - HeroX)) + "px, 0px)"; 
		Ux = HeroX - 18;
		Dx = -Ux;
		Ly = HeroY - 18;
		Ry = -Ly;
		CurX = 90 * Dx;
		CurX = 90 * Dx; // костыль
		CurY = 90 * Ry;
		corovanTimer = setInterval(destCorovan, 1200);
		document.getElementById('map').style.background = 'url(sands/sandBg.png)';
		document.getElementById('mapHolder').style.background = 'url(sands/sandBg.png)';
		document.getElementById('shadow').style.opacity = '0';	
	}
	
	function newGameCol() {
		if (isOverworld != 1) {
			document.getElementById('shadow').style.opacity = '0';
		};
		clearInterval(corovanTimer);
		Dx = Ux = Ly = Ry = CurX = CurY = 0;
		HeroX = HeroY = 18;
		document.getElementById('map').style.background = 'url(sands/sandBg.png)';
		document.getElementById('mapHolder').style.background = 'url(sands/sandBg.png)';
		document.getElementById("hero").innerHTML = "<img src='sands/colsprites/colfront.gif'>";
		document.getElementById('map').style.transform = 'translate3d(0px, 0px, 0px)';
		document.getElementById('reactor').style.transform = 'translate3d(0px, 0px, 0px)';
		document.getElementById('map').innerHTML = "<div id='corovan'><img src='sands/colsprites/corovan/korovanright.gif'></div>";
		corovanTimer = setInterval(destCorovan, 1200);
		clearCoordinates();
		initEarthMap();
		isJava = isKnight = hasSandShip = 0;
		document.getElementById('hireman').innerHTML = '';
		document.getElementById('company').style.top = '365px';
		document.getElementById('company').style.left = '452px';
	}
	
	function setQuest (questTypeString, questType) {
		movingMap = 0;
		document.getElementById("solutions").innerHTML = "<button class='buttons' onclick='guideAway()'>Принять квест</button>";
		clearInterval(timer);
		symbol = 0;
		document.getElementById("texting").innerHTML = "";
		document.getElementById("solutions").style.display = "block";
		timer = setInterval(talk, 40, questType);
		document.getElementById("guidepic").src = 'sands/quests/' + questTypeString + '.gif';
		document.getElementById("guide").style.transform = "translate3d(900px, 0px, 0px)";
	}
	
	function checkMovedEarth() {
		for (var i = HeroX - 1; i <= HeroX + 1; i++) {
			for ( var j = HeroY - 1; j <= HeroY + 1; j++) {
				var temp = checkGrassID(i * 90, j * 90);
				if (temp != undefined) {
					document.getElementById("grass" + temp).style.opacity = "1";
				}
			}
		};
		checkSchritt();
	}
	
	// Функции - хелперы
	
	function initLoop(x, y, a, b, val, array) {for (var i = x; i <= y; i++) {for (var j = a; j <= b; j++) {array[i][j] = val;}}}
	
	function doDeath() {
		Dx = Ux = Ly = Ry = 1;
		CurX = CurY = 0;
		movingMap = 1;
		document.getElementById('sound').innerHTML = "<audio src='sands/soundtrack/begin.mp3' autoplay loop>";
		if (isOverworld != 1){ 
			setTimeout("document.getElementById('shadow').style.opacity = '1';", 10);
		};
		document.getElementById('reactor').innerHTML = "<button id='newColGame' class='buttons' onclick='newGameCol()'>В новый поход!</button><p>О нет! Ты умер! Как же так?.. Ну ничего! Потомки завершат твое дело!</p><img src='sands/colsprites/coldead.gif'>";
		document.getElementById('reactor').style.transform = 'translate3d(0px, 740px, 0px)';
	}
	
	function kingAway () {document.getElementById('reactor').style.transform = 'translate3d(0px, 0px, 0px)';}
	
	function checkGrassID(x, y) {
		for (var i = 0; i <= 5; i++) {
			if ((x + 'px' == document.getElementById('grass' + i).style.top)
			&& (y + 'px' == document.getElementById('grass' + i).style.left)) {
				return i;
			}
		}
	}
	
	function checkDanger() {
			if (coord[HeroX][HeroY] == 6) {
				if (isKnight) {return 1;} else {return 0;}
			} else {
				return 1;
			}
	}
	
	function hire(x) {
		if (x == 1) {
			isJava = 1;
			isKnight = 0;
			document.getElementById('sound').innerHTML = "<audio src='sands/soundtrack/java.mp3' autoplay loop>";
		} else {
			isKnight = 1; 
			isJava = 0;
		}
		document.getElementById('hireman').innerHTML = '';
		document.getElementById('reactor').style.transform = 'translate3d(0px, 0px, 0px)';
	}
	
	var ifEqOpen = 0;
	function openBackPack(x) {
		if (x == 1) {
			if (ifEqOpen == 0) {
				document.getElementById('equipment').style.width = "1205px";
				document.getElementById('equipment').innerHTML = "<img class='control' onclick='openBackPack(1)' src='sands/controls/backpack.png'><img class='control' onclick='openBackPack(2)' src='sands/controls/scrollopen.png'><div id='eqContent'></div>";
				generateLoot();
				movingMap = 0;
				ifEqOpen = 1;
			} else {
				document.getElementById('equipment').style.width = "120px";
				document.getElementById('equipment').innerHTML = "<img class='control' onclick='openBackPack(1)' src='sands/controls/backpackopen.png'><img class='control' onclick='openBackPack(2)' src='sands/controls/scroll.png'>";
				movingMap = 1;
				ifEqOpen = 0;
			}
		} else if (x == 2) {
			if (ifEqOpen == 0) {
				document.getElementById('equipment').style.width = "1205px";
				document.getElementById('equipment').innerHTML = "<img class='control' onclick='openBackPack(1)' src='sands/controls/backpack.png'><img class='control' onclick='openBackPack(2)' src='sands/controls/scrollopen.png'><div id='eqContent'><div id='quester'></div><div id='questimg'></div><div id='questtext'></div></div>";
				document.getElementById('eqContent').style.background =  "#c0c0c0";
				generateQuest();
				movingMap = 0;
				ifEqOpen = 1;
			} else {
				document.getElementById('equipment').style.width = "120px";
				document.getElementById('equipment').innerHTML = "<img class='control' onclick='openBackPack(1)' src='sands/controls/backpackopen.png'><img class='control' onclick='openBackPack(2)' src='sands/controls/scroll.png'>";
				movingMap = 1;
				ifEqOpen = 0;
			}
		}
	}
	
	function eatHero() {
		movingMap = 0;
		document.getElementById('hireman').innerHTML = '';
		if (isOverworld){
			document.getElementById('hero').innerHTML = '<img src="sands/colsprites/worm/worm.gif">';
		} else {
			document.getElementById('hero').innerHTML = '<img src="sands/colsprites/worm/caveworm.gif">';
		}
		setTimeout('doDeath()', 1500);
	}
	
	function outSide(x) {
		instAway();
		document.getElementById('shadow').style.opacity = '0';
		initLoop(4, 7, 5, 8, 0, coord);
		if (x == 1) {
			document.getElementById('hero').innerHTML = '<img src="sands/colsprites/evil.gif">';
			summonGuide(5);
			curPlayer = 'evil';
			document.getElementById('showdown').innerHTML = '<img src="sands/quests/showdownkillguard.gif">';
		} else {
			document.getElementById('hero').innerHTML = '<img src="sands/colsprites/kindness.gif">';
			summonGuide(6);
			curPlayer = 'kindness';
			document.getElementById('showdown').innerHTML = '<img src="sands/quests/showdownkillmads.gif">';
		};
		
		movingMap = 0;
	}
	
	function showTutorial() {
		movingMap = 0;
		document.getElementById('reactor').style.left = "20px";
		document.getElementById('reactor').style.width = "910px";
		document.getElementById('reactor').style.height = "710px";
		document.getElementById('reactor').innerHTML = "<img class='tutor' src='sands/controls/interact.png'><p>Эта кнопка поможет вам взаимодействовать с обьектами на карте!</p><br><img class='tutor' src='sands/controls/cutdown.png'><p>Этой кнопкой можно срезать найденную траву, она попадет в твой инвентарь!</p><br><img class='tutor' src='sands/controls/backpack.png'><p>А это вот твой инвентарь! Открой его, чтобы посмотреть, что ты уже собрал!</p><br><img class='tutor' src='sands/controls/scroll.png'><p>Это окно покажет тебе текущий квест! Настоятельно рекомендуем идти по сюжету!</p><button class='buttons' onclick='instAway()'>Вернуться к игре!</button>";
		document.getElementById('reactor').style.transform = 'translate3d(0px, 620px, 0px)';
	}
	
	function instAway() {
		movingMap = 1;
		document.getElementById('reactor').style.transform = 'translate3d(0px, 0px, 0px)';
		document.getElementById('reactor').innerHTML = "";
		document.getElementById('reactor').style.left = "230px";
		document.getElementById('reactor').style.width = "400px";
		document.getElementById('reactor').style.height = "300px";
	}
	
	clearCoordinates();
	
	function  generateLoot() {
		
		for (var i = 0; i < G1; i++) {generateGrass(0);}
		for (var i = 0; i < G2; i++) {generateGrass(1);}
		for (var i = 0; i < G3; i++) {generateGrass(2);}
		for (var i = 0; i < G4; i++) {generateGrass(3);}
		for (var i = 0; i < G5; i++) {generateGrass(4);}
		for (var i = 0; i < G6; i++) {generateGrass(5);}
		
		function generateGrass(x)	 {
			parent = document.getElementById("eqContent");
			loot = document.createElement("div");
			loot.id = 'loot' + x;
			parent.insertBefore(loot, null);
			if (isOverworld) {
				document.getElementById('loot' + x).innerHTML = "<img src='sands/mapInteractive/grass" + (x % 3) + ".png'>";
			} else {
				document.getElementById('loot' + x).innerHTML = "<img src='sands/mapInteractive/grass" + (x % 3) + 3 + ".png'>";	
			};
			document.getElementById('loot' + x).style.padding = '5px 6px';
		}	
	}
	
	function generateQuest() {
		if (questTurn > 0) { 
		document.getElementById('quester').innerHTML = "<img src='sands/quests/" + currentQuest + ".gif'>";
		document.getElementById('questimg').innerHTML = "<img src='sands/quests/" + currentQuest + ".png'>";
		};
		
		switch (questTurn) {
			case (1): document.getElementById('questtext').innerHTML = "<p>" + quardquestDesc + "</p>"; break;
			case (2): document.getElementById('questtext').innerHTML = "<p>" + enterquestDesc + "</p>"; break;
			case (3): document.getElementById('questtext').innerHTML = "<p>" + wiserquestDesc + "</p>"; break;
			case (4): document.getElementById('questtext').innerHTML = "<p>" + clausequestDesc + "</p>"; break;
			case (5): document.getElementById('questtext').innerHTML = "<p>" + showdownDesc + "</p>"; break;
			default:
			document.getElementById('quester').innerHTML = "<img src='sands/quests/anon.gif'>";
			document.getElementById('questimg').innerHTML = "<img src='sands/quests/anon.png'>";
			document.getElementById('questtext').innerHTML = "<p>" + questLineBegins + "</p>";
		}
	}