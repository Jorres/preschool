const PASRAID = 30;
const ACTRAID = 150;
const PRODCHANCE = 25;
const RANDCHANCE = 100;
const PASDMG = 2;
const NATUREEFF = 2;
const RANDPRODAMOUNT = 2;

function natureActions(i, j) {	
    
	setRaides(i, j, i + 1, j);
	setRaides(i, j, i - 1, j);
	setRaides(i, j, i, j - 1);
	setRaides(i, j, i, j + 1);
	
	tryToProduce(i, j);
	setRandomEvent(i, j);
} 

function setRaides(i, j, dI, dJ) {
    
	var pasRaid = Math.round(Math.random() * PASRAID) == 1;
	var actRaid = false; //Math.round(Math.random() * ACTRAID) == 1;
	
	if ((dI > 0)&&(dI < FIELDHEIGHT + 1)&&(dJ > 0)&&(dJ < FIELDWIDTH + 1)&&(cells[dI][dJ].our)) {
		if (pasRaid) {
            animateCell('leaves', i, j, dI, dJ, 0.4);
            
            var dmg = PASDMG; // подсчет пассивной атаки для крепости
            if (cells[dI][dJ] == 'fortress') {dmg = 1};
            cells[dI][dJ].points -= dmg;
            
            if (cells[dI][dJ].points < 1) {captureCell(false, dI, dJ)};
        };
		// active attack, temporary disabled
		if (actRaid) {
			var CURVALUE, def, am;
			
			switch (cells[i][j].surface) {
				case 'forest': /* chooseAnim('ant', i, j. dI, dJ); */ am = cells[i][j].tanks; CURVALUE =TANKVALUE; def = cells[dI][dJ].tanks; cells[i][j].tanks = 0; break;
				case 'rock': /* chooseAnim('ptero', i, j. dI, dJ); */ am = cells[i][j].helics;  CURVALUE = HELVALUE; def = cells[dI][dJ].helics; cells[i][j].helics = 0; break;
				case 'field': /* chooseAnim('rabbit', i, j. dI, dJ); */ am = cells[i][j].soldiers;  CURVALUE = SOLDVALUE; def = cells[dI][dJ].soldiers; cells[i][j].soldiers = 0; break;
			};
			
			if (am - 1 < def) {
				def -= am;
				am = 0;
			} else {
				am -= def;
				def = 0;
			};
	
			var tEf = CURVALUE * am * NATUREEFF;
				
				switch (cells[i][j].surface) {
					case 'forest': cells[dI][dJ].tanks = def; break;
					case 'field': cells[dI][dJ].soldiers = def; break;
					case 'rock': cells[dI][dJ].helics = def; break;
				};
				
				am -= (cells[dI][dJ].points / CURVALUE);
            
                if (cells[dI][dJ] == 'fortress') {tEf = Math.round(tEf / 5);} // преимущество крепости!
            
                cells[dI][dJ].points -= tEf;
				
				if (cells[dI][dJ].points < 1) {captureCell(false, dI, dJ)};
		}
	}
}

function tryToProduce(i, j) {
        if (Math.round(Math.random() * PRODCHANCE) == 1) {
            animateCell('grow', i, j, i, j, 0.4);
            switch(cells[i][j].surface) {
                case 'forest': cells[i][j].tanks += 1; break;
                case 'field': cells[i][j].soldiers += 1; break;
                case 'rock': cells[i][j].helics += 1; break;
            } // прирост войск
        }
	
}

function setRandomEvent (i, j) {
    if (Math.round(Math.random() * RANDCHANCE) == 1) {
        switch (cells[i][j].surface)  {
            case 'forest': 
                animateCell('forestMonster', i, j, i, j, 0.4);
                cells[i][j].tanks += RANDPRODAMOUNT; 
                callAboutEvent('ants', i, j); break;
            case 'field': 
                animateCell('fieldMonster', i, j, i, j, 0.4); 
                cells[i][j].soldiers += RANDPRODAMOUNT; 
                callAboutEvent('rabbids', i, j); break;
            case 'rock': animateCell('rockMonster', i, j, i, j, 0.4);
                cells[i][j].helics += RANDPRODAMOUNT;
                callAboutEvent('pterodactiles', i, j); break;
	   }
    }
}

function callAboutEvent(name, i, j) {
    if (isBuiltNewsStation) {
        addNewNotice('Angry ' + name + ' rising in da cell ' + i + ', ' + j + '!');
    }
}

