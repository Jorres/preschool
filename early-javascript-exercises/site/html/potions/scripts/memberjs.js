var MemberMsg = 'Привет, мой юный друг! Tы тут новенький? Ооо, я тоже когда то начинал... Драить туалеты, мыть склянки... но не будем о грустном! Тебе предстоит начать с приготовления простейших противоядий в перерывах между уборкой. Возьми стакан.. Хотя нет, я сам поставлю.. Как только заведующий магазином при лаборатории передаст рецепт, а ты примешь посетителя, наливай микстуры в соответствии с симптомами: оранжевая для химических ран, желтая - для эстетических и фиолетовая - для моральных (самое тяжелое отравление!). Соблюдай пропорции, мы же не хотим "перелечить" несчастного (хехе). Все понятно? К отработке приступить! Пятеро увечных ждут тебя!';
var atFirstMember = 0;
	function genSymptoms () {
		Chem = Math.floor(Math.random() * 7);
		document.getElementById("ArgOne").innerHTML = "Химическое отравление: " + Chem;
		Est = Math.floor(Math.random() * 7);
		document.getElementById("ArgTwo").innerHTML = "Эстетическое отравление: " + Est;
		Mor = Math.floor(Math.random() * 7);
		document.getElementById("ArgThree").innerHTML = "Моральное отравление: " + Mor;
		document.getElementById("canv").style.background = "url(potions/other/fire.gif)";
		document.getElementById("mark").innerHTML = "";
		document.getElementById("visitor").innerHTML = "<img src='potions/visitor.gif'>";
	}
	
	function add(type) {
		
		if (type == "Happ") {
		ctx.strokeStyle = "rgb(255, 99, 71)";
		ctx.fillStyle = "rgb(255, 99, 71)";
		ChemU += 1;
		} else if (type == 'Pust') {
		ctx.strokeStyle = "rgb(124, 7, 169)";			
		ctx.fillStyle = "rgb(124, 7, 169)";
		MorU += 1;
		} else if (type = 'Vital') {
		ctx.strokeStyle = "rgb(238, 221, 130)";
		ctx.fillStyle = "rgb(238, 221, 130)";
		EstU += 1;
		}
		
		if (maxAmount < 20) {
		ctx.lineWidth = 2;
		
		ctx.beginPath();
		ctx.moveTo(40, 310 - upAmount);
		ctx.lineTo(40, 300 - upAmount);
		ctx.lineTo(160, 300 - upAmount);
		ctx.lineTo(160, 310 - upAmount);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		
		upAmount += 10;
		maxAmount += 1;
		}
	}

	function doClean() {
		ctx.clearRect(39, 310 - upAmount - 1, 122, upAmount + 2);
		EstU = MorU = ChemU = upAmount = maxAmount = 0;
	}
	
	var Chem, Est, Mor;
	var ChemU = EstU = MorU = 0;
	
	function checkPotion() {
		if ((ChemU == Chem) && (EstU == Est)  && (MorU == Mor)) {
			document.getElementById("mark").innerHTML = "<p>Весьма неплохо! Вы даже помогли человеку!</p>";
			document.getElementById("visitor").innerHTML = "<img src='potions/vishapp.png'>";
			totalHealed += 1;
			healedGuys += 1;
			LS.setItem('guys', totalHealed);
			document.getElementById("canv").style.background = "url(potions/other/fireoff.png)";
			doClean();
			if (healedGuys < 5) {
				document.getElementById("counter").innerHTML = "До звания доверенного осталось: " + (5 - healedGuys) + " посетителей";
		} else {
				doElderPromotion();
				LS.setItem('rank', 'elder');
			}
		}
		else {
			document.getElementById("mark").innerHTML = "<p>Ах, какой ужас.</p>";
			document.getElementById("visitor").innerHTML = "<img src='potions/visdead.png'>";
			totalHealed += 1;
			healedGuys -= 1;
			LS.setItem('guys', totalHealed);
			doClean();
			if (healedGuys < -5 ) {
				document.getElementById("counter").innerHTML = "До звания доверенного осталось: " + (10 - healedGuys) + " посетителей";
			} else {
				document.getElementById("counter").innerHTML = "<p>Позор вам! Вы изгнаны из Гильдии Алхимиков!</p>";
				document.getElementById("summon").style.display = "none";
			}
		}
	}