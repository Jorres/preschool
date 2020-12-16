		var frts, parent;
		var LS = window.localStorage;
		var healedGuys = scroll = movingMap = addPlace = tempID = 0;
		var symbol, timer, corovanTimer;
		
		if (LS.getItem('rank') === undefined) { 
			LS.setItem('rank', 'member');
		}
		
		if (LS.getItem('guys') === undefined) { 
			LS.setItem('guys', '0');
		} else {
			var totalHealed = LS.getItem('guys');
		}
		
	function talk(Msg) { 
		if (Msg[symbol] != undefined) {
			document.getElementById('texting').innerHTML += Msg[symbol]; 
			symbol++;
		} else {
			clearInterval(timer);
		}
	} 

	
	function summonGuide(x) {
		clearInterval(timer);
		symbol = 0;
		document.getElementById("texting").innerHTML = "";
		document.getElementById("guide").style.transform = 'translate3d(900px, 0px, 0px)';
		switch (x) {
			
			case (1):
				document.getElementById("guidepic").src = 'sands/members/Memberguide.gif';
				timer = setInterval(talk, 40, MemberMsg);
			break;
			
			case (2):
				document.getElementById("guidepic").src = 'sands/members/Elderguide.gif';
				timer = setInterval(talk, 40, ElderMsg);
			break;
			
			case (3):
				document.getElementById("guidepic").src = 'sands/members/Coleaderguide.gif';			
				timer = setInterval(talk, 40, ColeaderMsg);
			break;
			
			case (4): 
				document.getElementById("guidepic").src = 'sands/colsprites/dendy.png';		
				timer = setInterval(talk, 40, DendyMsg);
			break;
			
			case (5): 
				document.getElementById("guidepic").src = 'sands/colsprites/evildendy.png';		
				document.getElementById("getguideaway").style.display = 'none';	
				document.getElementById("solutions").style.display = 'none';
				setTimeout('guideAway()', 2000);
				timer = setInterval(talk, 40, EvilMsg);
			break;
			
			case (6): 
				document.getElementById("guidepic").src = 'sands/colsprites/kinddendy.png';		
				document.getElementById("getguideaway").style.display = 'none';	
				document.getElementById("solutions").style.display = 'none';
				setTimeout('guideAway()', 2000);				
				timer = setInterval(talk, 40, KindnessMsg);
			break;
		}
	}
	
	function toDesert() {
		if (scroll == 0) {
					document.getElementById("common").style.transform = "translate3d(0px, 1000px, 0px)";
					document.getElementById("coleaderLab").style.transform = "translate3d(0px, 1050px, 0px)";
					document.getElementById("coleaderLab").style.opacity = "1";
					setTimeout('initEarthMap()', 200)
					movingMap = 1;
					corovanTimer = setInterval(destCorovan, 1200);
					scroll = 1;
					if (atFirstColeader == 0) {
						document.getElementById("guide").style.transform = "translate3d(900px, 0px, 0px)";
						summonGuide(4);
						atFirstColeader = 1;
					}
				} else {
					clearInterval(corovanTimer);
					clearCoordinates();
					document.getElementById("map").innerHTML = "<div id='corovan'><img src='sands/colsprites/corovan/korovanright.gif'></div>";
					document.getElementById("common").style.transform = "translate3d(0px, 0px, 0px)";
					document.getElementById("coleaderLab").style.transform = "translate3d(0px, 0px, 0px)";
					document.getElementById("coleaderLab").style.opacity = "0";	
					movingMap = 0;
					scroll = 0;
		}
	}
	