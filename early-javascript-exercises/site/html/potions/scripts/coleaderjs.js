var ColeaderMsg = 'Стоять, кто идет! Минуточку.. Не ты ли тот кусок дерьма, что испортил все ингредиенты в лаборатории своими "экспериментами"? Тогда понятно, как ты так быстро поднялся по службе. Значит, будешь у меня отрабатывать, доходяга. Пойдешь разгребать пустынные пески в поисках трав для одной очень важной шишки.. И смотри чтоб без фокусов, щенок! Надевай стилсьют и шагом марш за работу! Ать-два!';
var G1 = G2 = G3 = isJava = isKnight = atFirstColeader = 0;

		function doCoordinates () {
			for (var i = 0; i < 40; i++) {
				coord[i] = new Array();
				for (var j = 0; j < 40; j++) {
					coord [i][j] = 0;
				}
			}
		}
		
		doCoordinates();
		addEventListener('keyup', keyPressHandler);
	var Dx = Ux = Ly = Ry = 1;
	var CurX = CurY = 0;
	function keyPressHandler(event) {
		var key = event.keyCode;
		
		if (movingMap == 1) {
			switch(key) {
				case (38):
					if ((Dx < 18) && (coord[HeroX - 1][HeroY] != 5)){
					document.getElementById("map").style.transform = "translate3d(" + CurY + "px, " + 90 * Dx + "px, 0px)";
					document.getElementById("hero").innerHTML = "<img src='potions/colsprites/colback.gif'>";
					if (isJava) {
					document.getElementById("hireman").innerHTML = "<img src='potions/colsprites/java/javaback.gif'>";}
					if (isKnight) {
					document.getElementById("hireman").innerHTML = "<img src='potions/colsprites/knight/knightback.gif'>";}
					if (checkDanger()) {
						doMove();
					} else {
						doDeath();
						break;
					};
					HeroX -= 1;
					Dx += 1;
					Ux -= 1;
					CurX += 90;
					}
				break;
				case (40):
					if ((Ux < 23) && (coord[HeroX + 1][HeroY] != 5)){
					document.getElementById("map").style.transform = "translate3d(" + CurY + "px, " + -90 * Ux + "px, 0px)";
					document.getElementById("hero").innerHTML = "<img src='potions/colsprites/colfront.gif'>";
					if (isJava) {
					document.getElementById("hireman").innerHTML = "<img src='potions/colsprites/java/javafront.gif'>";}
					if (isKnight) {
					document.getElementById("hireman").innerHTML = "<img src='potions/colsprites/knight/knightfront.gif'>";}
					if (checkDanger()) {
						doMove();
					} else {
						doDeath();
						break;
					};
					HeroX += 1;
					Ux += 1;
					Dx -= 1;
					CurX -= 90;
					}
				break;
				case (39):
					if ((Ly < 23) && (coord[HeroX][HeroY + 1] != 5)){
					document.getElementById("map").style.transform = "translate3d(" + -90 * Ly + "px, " + CurX + "px, 0px)";
					document.getElementById("hero").innerHTML = "<img src='potions/colsprites/colright.gif'>";
					if (isJava) {
					document.getElementById("hireman").innerHTML = "<img src='potions/colsprites/java/javaright.gif'>";}
					if (isKnight) {
					document.getElementById("hireman").innerHTML = "<img src='potions/colsprites/knight/knightright.gif'>";}
					if (checkDanger()) {
						doMove();
					} else {
						doDeath();
						break;
					};
					HeroY += 1;
					Ly += 1;
					Ry -= 1;
					CurY -=90;
					}
				break;
				case (37):
					if ((Ry < 18) && (coord[HeroX][HeroY - 1] != 5)){
					document.getElementById("map").style.transform = "translate3d(" + 90 * Ry + "px, " + CurX + "px, 0px)";
					document.getElementById("hero").innerHTML = "<img src='potions/colsprites/colleft.gif'>";
					if (isJava) {
					document.getElementById("hireman").innerHTML = "<img src='potions/colsprites/java/javaleft.gif'>";}
					if (isKnight) {
					document.getElementById("hireman").innerHTML = "<img src='potions/colsprites/knight/knightleft.gif'>";}
					if (checkDanger()) {
						doMove();
					} else {
						doDeath();
						break;
					};
					HeroY -= 1;
					Ry += 1;
					Ly -= 1;
					CurY += 90;
					}
				break;
			}
		}
	}
	
	function initLoop(x, y, a, b, val) {
		for (var i = x; i <= y; i++) {
			for (var j = a; j <= b; j++) {
				coord [i][j] = val;
				}
		}
	}
	
	function doMove() {
		for (var i = HeroX - 1; i <= HeroX + 1; i++) {
			for ( var j = HeroY - 1; j <= HeroY + 1; j++) {
				var temp = checkGrassID(i * 90, j * 90);
				if (temp != undefined) {
					document.getElementById("grass" + temp).style.opacity = "1";
				}
			}
		}
	}
	
	function checkPlacement(x, y) {
		if ((coord[x][y] == 0)&&(coord[x + 2][y] == 0)&&(coord[x][y + 2] == 0)&&(coord[x + 2][y + 2] == 0)) {
			return (1);
		} else {return (0);}
	}
	
	function initMap() {
		parent = document.getElementById("map");
		var i = 0;
		
		guild = document.createElement("div");
		parent.insertBefore(guild, null);	
		guild.id = 'base';
		initLoop(12, 17, 15, 20, 5);
		initLoop(13, 16, 16, 19, 1);
		coord[17][17] = coord[18][17] = 1;
		document.getElementById('base').innerHTML = "<img src='potions/colsprites/guild2.png'>";
		document.getElementById('base').style.position = 'absolute';
		document.getElementById('base').style.top = '1070px';
		document.getElementById('base').style.left = '1320px';
		
		while (i < 1) {
			x = Math.floor(Math.random() * 32) * 90 + 100;
			y = Math.floor(Math.random() * 32) * 90 + 100;
			Cx = Math.floor(x / 90);
			Cy = Math.floor(y / 90);
			if (checkPlacement(Cx, Cy)) {
				tempID = 'fortress' + i;
				frts = document.createElement("div");
				parent.insertBefore(frts, null);	
				frts.id = tempID;
				initLoop(Cx, Cx + 2, Cy, Cy + 2, 5);
				coord[Cx + 2][Cy + 1] = 2;
				document.getElementById(tempID).innerHTML = "<img src='potions/colsprites/fortress.gif'>";
				document.getElementById(tempID).style.position = 'absolute';
				document.getElementById(tempID).style.top = x + 'px';
				document.getElementById(tempID).style.left = y + 'px';
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
				tempID = 'tent' + i;
				tent = document.createElement("div");
				parent.insertBefore(tent, null);	
				tent.id = tempID;
				initLoop(Cx, Cx + 3, Cy, Cy + 3, 3);
				document.getElementById(tempID).innerHTML = "<img src='potions/colsprites/tent.png'>";
				document.getElementById(tempID).style.position = 'absolute';
				document.getElementById(tempID).style.top = x + 'px';
				document.getElementById(tempID).style.left = y + 'px';
			} else {
				i -= 1;
			};
			i += 1;
		};
		
		i = 0;
		
				while (i < 2) {
			x = Math.floor(Math.random() * 32) * 90 + 90;
			y = Math.floor(Math.random() * 32) * 90 + 90;
			Cx = Math.floor(x / 90);
			Cy = Math.floor(y / 90);
			var range = Math.floor(Math.random() * 3) + 2; 
			if (checkPlacement(Cx, Cy)) {
				tempID = 'tower' + i;
				initLoop(Cx - range, Cx + 2 + range, Cy - range, Cy + 3 + range, 6);
				initLoop(Cx, Cx + 2, Cy, Cy + 1, 5);
				tower = document.createElement("div");
				parent.insertBefore(tower, null);	
				tower.id = tempID;
				document.getElementById(tempID).innerHTML = "<img src='potions/colsprites/tower.gif'>";
				document.getElementById(tempID).style.position = 'absolute';
				document.getElementById(tempID).style.top = x + 'px';
				document.getElementById(tempID).style.left = y + 'px';
			} else {
				i -= 1;
			};
			i += 1;
		};
		
		i = 0;
		
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
				document.getElementById(tempID).innerHTML = "<img src='potions/mapInteractive/grass" + ((i % 3) + 1) + ".png'>";
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
	}
	
	
	function checkGrass() {
		switch (coord[HeroX][HeroY]) {
			case (4):
				document.getElementById('hero').innerHTML = "<img src='potions/colsprites/colbrew.gif'>";
				if (isJava) {document.getElementById('hireman').innerHTML = "<img src='potions/colsprites/java/javafront.gif'>";}
				var temp = checkGrassID(HeroX * 90, HeroY * 90);
				document.getElementById('grass' + temp).style.display = 'none';
				parent = document.getElementById("inventar");
				loot = document.createElement("div");
				if (temp % 3 == 0) {
					G1 += 1;
				} else if (temp % 3 == 1) {
					G2 += 1;
				} else {
					G3 += 1;
				};
				loot.id = 'loot' + temp;
				parent.insertBefore(loot, null);
				document.getElementById('loot' + temp).innerHTML = "<img src='potions/mapInteractive/grass" + ((temp % 3) + 1) + ".png'>";
				document.getElementById('loot' + temp).style.padding = '5px 6px';
			break;
		}
	}
	
	function checkGrassID(x, y) {
		for (var i = 0; i <= 4; i++) {
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
	
	function doDeath() {
		Dx = Ux = Ly = Ry = 1;
		CurX = CurY = 0;
		document.getElementById('reactor').innerHTML = "<button id='newColGame' onclick='newGameCol()'>В новый поход!</button><p>О нет! Ты умер! Как же так?.. Ну ничего! Потомки завершат твое дело!</p><img src='potions/colsprites/coldead.gif'>";
		document.getElementById('reactor').style.transform = 'translate3d(0px, 740px, 0px)';
	}
	
	var CorY = CorX = 0;
	var CorXpx, CorYpx;
	
	function destCorovan() {
		var dest = Math.floor(Math.random() * 4);
		if ((HeroX != CorX)&&(HeroY != CorY)) {
			if (dest == 1){
					if ((coord[CorX][CorY + 1] != 5)&&(CorY <= 37)) {
							CorY += 1;
							document.getElementById('corovan').innerHTML = "<img src='potions/colsprites/corovan/korovanfront.gif'>";
					}
			} else if (dest == 2) {
					if ((coord[CorX + 1][CorY] != 5)&&(CorX <= 37)) {
							CorX += 1;
							document.getElementById('corovan').innerHTML = "<img src='potions/colsprites/corovan/korovanright.gif'>";
					}
			} else if (dest == 3) {
					if ((coord[CorX][CorY - 1] != 5)&&(CorY >= 2)) {
							CorY -= 1;
							document.getElementById('corovan').innerHTML = "<img src='potions/colsprites/corovan/korovanback.gif'>";
					}
			} else if (dest == 4) {
					if ((coord[CorX - 1][CorY] != 5)&&(CorX >= 2)) {
							CorX -= 1;
							document.getElementById('corovan').innerHTML = "<img src='potions/colsprites/corovan/korovanleft.gif'>";
					}
			}
		};
		CorXpx = CorX * 90;
		CorYpx = CorY * 90;
		document.getElementById('corovan').style.transform = "translate3d(" + CorXpx + "px, " + CorYpx + "px, 0px)";
	};
	
	var ifInvent = 0;
	function openBackPack() {
		if (ifInvent == 0) {
			document.getElementById('ColBackPack').style.width = "1195px";
			document.getElementById('rucksack').src = "potions/controls/backpack.png";
			movingMap = 0;
			ifInvent = 1;
		} else {
			document.getElementById('ColBackPack').style.width = "140px";
			document.getElementById('rucksack').src = "potions/controls/backpackopen.png";
			movingMap = 1;
			ifInvent = 0;
		}
	}
	
	function interact() {
		if (coord[HeroX][HeroY] != 0) {
			if (coord[HeroX][HeroY] == 1) {
				if ((G1 >= 1) && (G2 >= 1) && (G3 >= 1)) {
					document.getElementById('reactor').innerHTML = "<button id='newColGame' onclick='newGameCol()'>В новый поход!</button><p>Наконец-то ты вернулся! Садись пировать! Об орденах пого-*ик*-ворим...</p><img src='potions/colsprites/king.png'>";
					document.getElementById('reactor').style.transform = 'translate3d(0px, 740px, 0px)';
				} else {
					document.getElementById('reactor').innerHTML = "<button id='newColGame' onclick='kingAway()'>Продолжить поиски!</button><p>Да как ты посмел вернуться без священных трав?! Вперед на поиски!</p><img src='potions/colsprites/angryking.png'>";
					document.getElementById('reactor').style.transform = 'translate3d(0px, 740px, 0px)';
				}
			} else if (coord[HeroX][HeroY] == 3) {
				document.getElementById('reactor').innerHTML = "<button id='newColGame' onclick='hire(1)'>Нанять яву в попутчики!</button><p>Здравствуй, человек! Готов отправиться с тобой в путешествие всего за пару целебных корешков! </p><img src='potions/colsprites/java/javatalk.gif'>";
				document.getElementById('reactor').style.transform = 'translate3d(0px, 740px, 0px)';
			} else if (coord[HeroX][HeroY] == 2) {
				document.getElementById('reactor').innerHTML = "<button id='newColGame' onclick='hire(2)'>Нанять рыцаря в попутчики!</button><p>Охохо! Мой меч скучает по приключениям! Я с радостью пойду за тобой, милорд!</p><img src='potions/colsprites/knight/knighttalk.png'>";
				document.getElementById('reactor').style.transform = 'translate3d(0px, 740px, 0px)';
			}
		}
	}
	
	function hire(x) {
		if (x == 1) {
			isJava = 1;
			isKnight = 0;
			document.getElementById('sound').innerHTML = "<audio src='potions/soundtrack/java.mp3' autoplay loop>";
		} else {
			isKnight = 1; 
			isJava = 0;
		}
		document.getElementById('hireman').innerHTML = '';
		document.getElementById('reactor').style.transform = 'translate3d(0px, 0px, 0px)';
	}
	
	function kingAway () {document.getElementById('reactor').style.transform = 'translate3d(0px, 0px, 0px)';}
	
	function newGameCol() {
		HeroX = HeroY = 17;
		document.getElementById("hero").innerHTML = "<img src='potions/colsprites/colfront.gif'>";
		document.getElementById('map').style.transform = 'translate3d(0px, 0px, 0px)';
		document.getElementById('inventar').style.transform = 'translate3d(0px, 0px, 0px)';
		document.getElementById('reactor').style.transform = 'translate3d(0px, 0px, 0px)';
		document.getElementById('map').innerHTML = "<div id='corovan'><img src='potions/colsprites/corovan/korovanright.gif'></div>";
		document.getElementById('sound').innerHTML = "<audio src='potions/soundtrack/begin.mp3' autoplay loop>";
		doCoordinates();
		initMap();
		isJava = isKnight = 0;
		document.getElementById('hireman').innerHTML = '';
	}