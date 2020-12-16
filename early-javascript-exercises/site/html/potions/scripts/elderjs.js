var ElderMsg = 'Здравствуй, стажер! Получил повышение в ранге?.. Мои поздравления. Что ж, теперь твоя работа станет чуть менее рутинной: в нашем собрании реактивов слишком много веществ, чтобы составить из них всевозможные комбинации. Эту работу мы и поручаем доверенным! Ох, не пугайся: тебе просто нужно будет смешивать любые ингредиенты и смотреть, что из этого выйдет. Вообще ты можешь получить четыре комбинации - учти что порядок значения не имеет, а вещество с самим собой смешивать - пустая растрата драгоценного ингредиента! Ключи от склада и защитный костюм.. не убегай, прошу!.. так вот, они лежат на столе. Удачи тебе, новоявленный естествоиспытатель! Если что-то забудешь, обратись ко мне снова.'
var atFirstElder = 0;

	function addIngred(z) {
		if (addPlace == 0) {
			addPlace = 1;
			switch (z) {
				case ('flamedust'):
				document.getElementById("AlchF").innerHTML = '<img src="potions/ingreds/flamedust.png">';
				FirstIngred = 1;
				break;
				case ('grass'):
				document.getElementById("AlchF").innerHTML = '<img src="potions/ingreds/grass.png">';
				FirstIngred = 2;
				break;
				case ('icepot'):
				document.getElementById("AlchF").innerHTML = '<img src="potions/ingreds/icepot.png">';
				FirstIngred = 3;
				break;
				case ('redrombs'):
				document.getElementById("AlchF").innerHTML = '<img src="potions/ingreds/redrombs.png">';
				FirstIngred = 4;
				break;
				case ('sugar'):
				document.getElementById("AlchF").innerHTML = '<img src="potions/ingreds/sugar.png">';
				FirstIngred = 5;
				break;
				case ('waterleaf'):
				document.getElementById("AlchF").innerHTML = '<img src="potions/ingreds/waterleaf.png">';
				FirstIngred = 6;
				break;
				case ('starroot'):
				document.getElementById("AlchF").innerHTML = '<img src="potions/ingreds/starroot.png">';
				FirstIngred = 7;
				break;
				case ('dish'):
				document.getElementById("AlchF").innerHTML = '<img src="potions/ingreds/dish.png">';
				FirstIngred = 8;
				break;
			}
		} else {
				addPlace = 0;
				switch (z) {
				case ('flamedust'):
				document.getElementById("AlchS").innerHTML = '<img src="potions/ingreds/flamedust.png">';
				SecIngred = 1;
				break;
				case ('grass'):
				document.getElementById("AlchS").innerHTML = '<img src="potions/ingreds/grass.png">';
				SecIngred = 2;
				break;	
				case ('icepot'):
				document.getElementById("AlchS").innerHTML = '<img src="potions/ingreds/icepot.png">';
				SecIngred = 3;
				break;
				case ('redrombs'):
				document.getElementById("AlchS").innerHTML = '<img src="potions/ingreds/redrombs.png">';
				SecIngred = 4;
				break;
				case ('sugar'):
				document.getElementById("AlchS").innerHTML = '<img src="potions/ingreds/sugar.png">';
				SecIngred = 5;
				break;
				case ('waterleaf'):
				document.getElementById("AlchS").innerHTML = '<img src="potions/ingreds/waterleaf.png">';
				SecIngred = 6;
				break;
				case ('starroot'):
				document.getElementById("AlchS").innerHTML = '<img src="potions/ingreds/starroot.png">';
				SecIngred = 7;
				break;
				case ('dish'):
				document.getElementById("AlchS").innerHTML = '<img src="potions/ingreds/dish.png">';
				SecIngred = 8;
				break;
			}
		}
	}

	function checkComb (FirstIngred, SecIngred) {
		switch (FirstIngred) {
			case(1):
				if (SecIngred == 6) {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/combined/ichor.png">';
					document.getElementById("markII").innerHTML = 'Успех!';
				} else {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/ohno.png">';
					document.getElementById("markII").innerHTML = 'Неудача!';
				};
			break;
			
			case(2):
				if (SecIngred == 5) {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/combined/tornado.png">';
					document.getElementById("markII").innerHTML = 'Успех!';
				} else {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/ohno.png">';
					document.getElementById("markII").innerHTML = 'Неудача!';
				};
			break;
			
			case(3):
				if (SecIngred == 4) {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/combined/love.png">';
					document.getElementById("markII").innerHTML = 'Успех!';
				} else {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/ohno.png">';
					document.getElementById("markII").innerHTML = 'Неудача!';
				};
			break;
			
			case(4):
				if (SecIngred == 3) {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/combined/love.png">';
					document.getElementById("markII").innerHTML = 'Успех!';
				} else {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/ohno.png">';
					document.getElementById("markII").innerHTML = 'Неудача!';
				};
			break;
			
			case(5):
				if (SecIngred == 2) {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/combined/tornado.png">';
					document.getElementById("markII").innerHTML = 'Успех!';
				} else {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/ohno.png">';
					document.getElementById("markII").innerHTML = 'Неудача!';
				};
			break;
			
			case(6):
				if (SecIngred == 1) {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/combined/ichor.png">';
					document.getElementById("markII").innerHTML = 'Успех!';
				} else {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/ohno.png">';
					document.getElementById("markII").innerHTML = 'Неудача!';
				};
			break;
			
			case(7):
				if (SecIngred == 8) {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/combined/pixie.png">';
					document.getElementById("markII").innerHTML = 'Успех!';
				} else {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/ohno.png">';
					document.getElementById("markII").innerHTML = 'Неудача!';
				};
			break;
			
			case(8):
				if (SecIngred == 7) {
					document.getElementById("res").innerHTML = '<img src="potions/ingreds/combined/pixie.png">';
					document.getElementById("markII").innerHTML = 'Успех!';
				} else {
					document.getElementById("res").innerHTML = '<img src="potions/sxingreds/ohno.png">';
					document.getElementById("markII").innerHTML = 'Неудача!';
				};
			break;
		}
	}

	function cleanIngreds() {
		document.getElementById("AlchF").innerHTML = "";
		document.getElementById("AlchS").innerHTML = "";
		document.getElementById("res").innerHTML = "";
		document.getElementById("markII").innerHTML = '';
	}