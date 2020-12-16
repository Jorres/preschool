var DendyMsg = 'Здравствуй! Помнишь меня? Я - тот доходяга, что трудился в пустыне на благо солидера *зачеркнуто* Гильдии Алхимиков, но я ушел на вольные хлеба и начал подрабатывать у местных купцов и королей, принося им травки из окрестных мест. Меня все так же радует Ява и защищает храбрый Рыцарь, однако времена меняются: нас ждут новые места, новые опасности и новые горы золота! Не будем мешкать, вперед за славой и шалфеем! Захочешь видеть туториал - он вон за то книжечкой справа на панельке.'

var DendyMsgEng = 'Hey guy! Remember me? I am dat jackass, who burnt himself in deserts sands to the good of different rich bitches, but for now Im workin on myself, takin orders to rare grass-ingredients from rich kings and other stubborns. Im continiously glad by Java and protected with brave Knight, but its brand new day, brand new world! New dangers, places to visit and gold heaps re waitin for us! Forward to glory and hereth! Wanna see a tutorial? Look right to the right - that book, yep!'

var DendyMsgDeutsch = 'Hey du da! Erinnerst du dich uber mich? Na ja, bin ich ein besonders Pilger, wer arbeitet in der Wuste fur Geld fon verschiedenen Konig und Konigen, Zaubergilden und Zauberern. Fur jetzt muhe ich mich fur mich, bringe verschiedene Zutaten von Wustgebieten und wandere. Beitrete mir! Arbeiten wir zusammen! Geldberge und Salbei wartet fur uns! Gehen wir los! Wie wolltest du ein Tutorial sehen - seh rechts, dieser Buch, ja!'

var guardquestMsg = 'Ох.. Здрравствуй, скиталец! Я - почетный страж, охраняющий врата нашего города от всякой нечисти! Н-да.. Не очень убедительно получилось? Простите, я тут новенький.. Еще не успел освоиться.. Ох. Разумеется, я пропущу вас в город, но не могли бы вы выполнить небольшую услугу? Если вам, конечно, не трудно.. Девушка, в которую я влюблен (ох) увлекается составлением ароматных эфиров из местных трав, особенно же ей нравится Голубоцвет.. Да-да, такая голубая травка. Я хотел бы подарить ей один такой, они, видите ли, довольно редки.. Вы поможете? ну пожалуйста!..'
var quardquestDesc = 'Вам нужно найти в песках один голубой цветок и принести его охраннику у ворот крепости. Тогда он пустит вас в город, и...'

var enterquestMsg = 'О, вы нашли его!.. Молва о ваших способностях оказалась не пустым слухом. Огромнейшее вам спасибо, скиталец! Теперь ворота в город для вас всегда открыты и ваш покорный слуга всегда рад вас видеть. Не заблудитесь! Ох, хоть бы не помять.. А вы направляйтесь в город - найдете там королевского советника, наверняка он поможет вам устроиться!';
var enterquestDesc = 'Охранник у ворот посоветовал вам направиться в город.'

var wiserquestMsg = 'Так, семь раз по девять... хм... Так! Кто пустил сюда это отребье? Ах, это вы тот самый "искатель травок"... Мои "уши" сообщали мне о вас достаточно часто, чтобы двор заинтересовался вами. Однако одних доносов мне недостаточно для проверки вашей компетентности. Принесите-ка мне Розоволист, и поживее, у нас желающих и без вас хватает! Как исключили даже из Красной книги? Это уже ваши проблемы. А теперь пошел вон, не мешай госслужащему! Так-так... три плюс девять... минус налоги...';
var wiserquestDesc = 'Теперь вам нужно найти Розоволист и принести его королевскому советнику! Вперед!';
var clausequestMsg = 'Хм.. Нашли? Похвально, похвально. Король будет рад такому приобретению. Теперь вы работаете на этот город, ваша задача - искать травки всем, кто этого желает и собирать с них золотишко.. С дальнейшими действиями я разберусь сам. А теперь пшел вон, ищи работу себе и деньги казне!';
var clausequestDesc = 'Советник завтавляет вас походить по городу и поискать себе клиентов самостоятельно. Ну что ж...';

var showdownMsg = "Ччеловек в капюшоне! СССТОЙ!.. Нет времени знакомиться - вокруг СССЛИШКОМ много ушей.. Иди к месту ссстоянки одинокого корована.. я ссскоро буду там.. ДО ВСТРЕЧИ!.."
var showdownDesc = "Тебя повстречал таинственный незнакомец и просит встречи недалеко от города. ЧТО происходит в этом мире?"

var questLineBegins = 'Вот вы и оказались свободны. Ваши приключения начинаются! Подойдите к охраннику у ворот города.'
var EvilMsg = 'зло поработило планету! теперь делай все что захочешь';
var KindnessMsg = 'не зло не поработило планету! теперь делай все что захочешь';

function checkQuest() {
	if (coord[HeroX][HeroY] == 10) { 
		if ((questTurn == 1) && (G1 >= 1)) {
			questTurn = 2;
			currentQuest = 'enterquest';
			setQuest("guardquest", enterquestMsg);
			G1 -= 1;
			coord[16][16] = 11;
			document.getElementById('mapquester').style.left = '1625px';
			document.getElementById("solutions").style.display = "none";
		}
	} else if ((isInTown)&&(townCoord[HeroX][HeroY] == 2)) { 
		if ((questTurn == 3) && (G2 >= 1)) {
			questTurn = 4;
			currentQuest = 'clausequest';    
			setQuest("clausequest", clausequestMsg);     
			G2 -= 1;
			var townparent = document.getElementById("townMap");
			townMadguy = document.createElement("div");
			townparent.insertBefore(townMadguy, null);	
			townMadguy.innerHTML = "<img src='sands/quests/mapearth.gif'>";
			townMadguy.style.position = 'absolute';
			townMadguy.style.top = '190px';
			townMadguy.style.left = '810px';	
			townCoord[2][9] = 3;
		}
	}
}

function checkSchritt() {
	if (coord[HeroX][HeroY] == 10) {
		if (currentQuest == '') {movingMap = 0; setQuest("guardquest", guardquestMsg);}
		questTurn = 1;
		currentQuest = 'guardquest';
	} else if (coord[HeroX][HeroY] == 11) {
		isInTown = 1;
		document.getElementById('shadow').style.opacity = '1';
		setTimeout('intoTown()', 1500);
	} else if ((isInTown)&&(townCoord[HeroX][HeroY] == 1)) {
		isInTown = movingMap = 0;
		document.getElementById('shadow').style.opacity = '1';
		setTimeout('outOfTown()', 1500);
	} else if ((isInTown)&&(townCoord[HeroX][HeroY] == 2)) {
		if (questTurn == 2) {
			questTurn = 3;
			currentQuest = 'wiserquest';
			setQuest("wiserquest", wiserquestMsg);
		}
	} else if ((isInTown)&&(townCoord[HeroX][HeroY] == 3)) {
		if (questTurn == 4) {
			questTurn = 5;
			currentQuest = "showdown";
			setQuest("showdown", showdownMsg);
		}
	} else if ((coord[HeroX][HeroY] == 12)&&(isInTown != 1)) {
		document.getElementById('shadow').style.opacity = "1";
		showTutorial();
		document.getElementById('reactor').innerHTML = '<div class="side" onclick="outSide(1)" id="harks"><img src="sands/quests/wiserquest.gif"><p>Товарищ! Ты нам нужен! Освободим же эту землю от исчадий рода человеческого! Руби заразу!</p></div><div class="side" onclick="outSide(2)" id="freemans"><img src="sands/quests/showdown.gif"><p>Положим конец беззаконию и начало правосудию! Помоги же истинным вледельцам этой земли!</p></div>';
	}
}

function guideAway() {
	document.getElementById('guide').style.transform = 'translate3d(0px, 0px, 0px)';
	movingMap = 1;
	if (questTurn == 2) {
		var townparent = document.getElementById("townMap"); //костыль!просто не получается вынести в верхние обьявлялки?
		townWiser = document.createElement("div");
		townparent.insertBefore(townWiser, null);	
		townWiser.id = 'townWiser';
		document.getElementById('townWiser').innerHTML = "<img src='sands/quests/mapwiser.gif'>";
		document.getElementById('townWiser').style.position = 'absolute';
		document.getElementById('townWiser').style.top = '360px';
		document.getElementById('townWiser').style.left = '450px';		
	};
	if (questTurn == 5) {
		parent = document.getElementById("map");
		showdown = document.createElement("div");
		parent.insertBefore(showdown, null);	
		showdown.id = 'showdown';
		document.getElementById('showdown').innerHTML = "<img src='sands/quests/showdown.png'>"; //GIF
		document.getElementById('showdown').style.position = 'absolute';
		document.getElementById('showdown').style.top = '360px';
		document.getElementById('showdown').style.left = '450px';
		initLoop(4, 7, 5, 8, 12, coord);
	}
}