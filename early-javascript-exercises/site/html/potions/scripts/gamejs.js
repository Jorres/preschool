
		var frts, parent;
		var LS = window.localStorage;
		var FirstIngred, SecIngred, access, away;
		var upAmount = maxAmount = healedGuys = scroll = movingMap = addPlace = tempID = 0;
		var cnv = document.getElementById("canv");
		var ctx = cnv.getContext("2d");
		var coord = new Array();
		var HeroX = HeroY = 17;
		var symbol, timer;
		
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
				document.getElementById("guidepic").src = 'potions/members/Memberguide.gif';
				timer = setInterval(talk, 40, MemberMsg);
			break;
			
			case (2):
				document.getElementById("guidepic").src = 'potions/members/Elderguide.gif';
				timer = setInterval(talk, 40, ElderMsg);
			break;
			
			case (3):
				document.getElementById("guidepic").src = 'potions/members/Coleaderguide.gif';			
				timer = setInterval(talk, 40, ColeaderMsg);
			break;
		}
	}
	
	function doElderPromotion() {
		document.getElementById("congrat").style.left = "200px";
		document.getElementById("MemberLab").style.transform = "translate3d(0px, 0px, 0px)";
		LS.setItem('rank', 'elder');
		initProfile();
	}
	
	function cleanCongrat() {
		document.getElementById("congrat").style.left = "-1000px";
		changePage(1);
	}
	
	function unsetProgress() {
		LS.clear();
		initProfile();
	}
	
	function guideAway() {
		document.getElementById('guide').style.transform = 'translate3d(0px, 0px, 0px)';
	}
	

	function changePage (access) {	
		switch (access) {
			case (1):
					if (scroll == 0) {
						document.getElementById("MemberLab").style.transform = "translate3d(0px, -1040px, 0px)";
						document.getElementById("common").style.transform = "translate3d(0px, -800px, 0px)";
						document.getElementById("MemberLab").style.opacity = "1";
						if (atFirstMember == 0) {
							document.getElementById("guide").style.transform = "translate3d(890px, 0px, 0px)";
							summonGuide(1);
							atFirstMember = 1;
						}
						scroll = 1;
					} else {
						document.getElementById("MemberLab").style.transform = "translate3d(0px, 0px, 0px)";
						document.getElementById("common").style.transform = "translate3d(0px, 0px, 0px)";
						document.getElementById("MemberLab").style.opacity = "0";
						scroll = 0;
					}
					break;
					
			case (2):
				if (scroll == 0) {
					document.getElementById("eldLab").style.transform = "translate3d(2018px, 0px, 0px)";
					document.getElementById("common").style.transform = "translate3d(0px, -800px, 0px)";
					document.getElementById("eldLab").style.opacity = "1";	
					if (atFirstElder == 0) {
						document.getElementById("guide").style.transform = "translate3d(900px, 0px, 0px)";
						summonGuide(2);
						atFirstElder = 1;
					}
					scroll = 1;
				} else {
					document.getElementById("eldLab").style.transform = "translate3d(0px, 0px, 0px)";
					document.getElementById("common").style.transform = "translate3d(0px, 0px, 0px)";
					document.getElementById("eldLab").style.opacity = "0";
					scroll = 0;					
				}
					break;
			
			case (3):
				if (scroll == 0) {
					document.getElementById("common").style.transform = "translate3d(0px, 1000px, 0px)";
					document.getElementById("coleaderLab").style.transform = "translate3d(0px, 1050px, 0px)";
					document.getElementById("coleaderLab").style.opacity = "1";
					initMap();
					movingMap = 1;
					var corovanTimer = setInterval(destCorovan, 1200);
					scroll = 1;
					if (atFirstColeader == 0) {
						document.getElementById("guide").style.transform = "translate3d(900px, 0px, 0px)";
						summonGuide(3);
						atFirstColeader = 1;
					}
				} else {
					document.getElementById("common").style.transform = "translate3d(0px, 0px, 0px)";
					document.getElementById("coleaderLab").style.transform = "translate3d(0px, 0px, 0px)";
					document.getElementById("coleaderLab").style.opacity = "0";	
					movingMap = 0;
					scroll = 0;
				}
					break;
			
			case (4):
					break;
		}
	}
	