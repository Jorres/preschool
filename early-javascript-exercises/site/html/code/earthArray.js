var cells = [];
const INCOMEPERSTABB = 10;
var mainGameTimer;
var isGoing = false;

function setClimate(i, j) {
	var setter = Math.round(Math.random() * 2);
	switch (setter) {
		case 1: $('#c'+ i + j).html('<img src="src/forest.gif">');
				cells[i][j] = {
					points: 100,
					building: 'nature',
					tanks: 10,
					soldiers: 10,
					our: false,
					surface: 'forest',
					helics: 0
				};
				break;
                                    
		case 0: $('#c'+ i + j).html('<img src="src/rock.gif">');
				cells[i][j] = {
					points: 100,
					building: 'nature',
					tanks: 0,
					soldiers: 10,
					our: false,
					surface: 'rock',
					helics: 10
				};
				break;
		case 2: $('#c'+ i + j).html('<img src="src/field.gif">');
				cells[i][j] = {
					points: 100,
					building: 'nature',
					tanks: 10,
					soldiers: 10,
					our: false,
					surface: 'field',
					helics: 0
				};
				break;
	}	
}

function createCells() {
    for (var i = 1; i <= FIELDHEIGHT; i++) {
        cells[i] = [];
        for (var j = 1; j <= FIELDWIDTH; j++) {
            var parent = document.getElementById("map");	
            var cell = document.createElement('div');
            parent.insertBefore(cell, null);
            
            cell.id = 'c' + i + j;
            cell.className = 'cell';
            cell.x = i;
            cell.y = j;
            cell.onclick = function() {react(this.x, this.y);};
            setClimate(i, j);
        }
    };
    
    $('#c33').html('<img src="src/factory.gif">');
					cells[3][3] = {
						points: 100,
						building: 'factory',
						tanks: 5,
						soldiers: 10,
						our: true,
						surface: 'forest',
						helics: 0						
					};
			
        $('#c34').html('<img src="src/stabb.gif">');
					cells[3][4] = {
						points: 100,
						building: 'stabb',
						tanks: 5,
						soldiers: 10,
						our: true,
						surface: 'field',
						helics: 0						
					}; 
}   
	
	function mainGameLoop() {
        isGoing = true;
		for (var i = 1; i <= FIELDHEIGHT; i++) {
			for (var j = 1; j <= FIELDWIDTH; j++) {
				if (cells[i][j].building == 'stabb') {money += INCOMEPERSTABB;}
				if (!cells[i][j].our) {natureActions(i, j);}
			}
		};

			$('#money').html('<img src="src/money.png">' + money);
			
			mainGameTimer = setTimeout(mainGameLoop, 1000);
	}
	
	function startGame() {
		$('#startGame').css('transform', 'translate3d(0px, 2000px, 0px)');
		$('#playscreen').css('transform', 'translate3d(0px, 2000px, 0px)');

        createCells();
		mainGameTimer = setTimeout(mainGameLoop, 1000);
	}