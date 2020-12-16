
	var p1 = document.getElementById("up1");
	var p2 = document.getElementById("point2");

	var cnt1 = 0;
	var cnt2 = 0;

	function IntCnt(player) {
		if (player = 1) then {
			cnt1++;
			p1.innerHTML = cnt1
		}
		else {
			cnt2++;
			p1.innerHTML = cnt1
		}
	}

	p1.onclick = intCnt(1);			
