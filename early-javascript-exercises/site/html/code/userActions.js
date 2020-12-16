var curI = 1, curJ = 1, totalRepairKits = 0, money = 1000, natureCells = 30;
const FIELDWIDTH = 8, FIELDHEIGHT = 4;
const TANKVALUE = 5, HELVALUE = 7, SOLDVALUE = 3;
var statsUpdate, curTank, curSoldier, curHelic;
var isBuiltNewsStation = false;

function defPointsColor(points) {
	if (points > 0)  {$('#points').css('background-color', '#FF2800');}
	if (points > 20)  {$('#points').css('background-color', '#DD3050');}
	if (points > 40)  {$('#points').css('background-color', '#FFE800');}
	if (points > 60)  {$('#points').css('background-color', '#E2FA00');}
	if (points > 80) {$('#points').css('background-color', '#9FEE00');}
	if (points == 100) {$('#points').css('background-color', '#4DDE00');}
}

function dynamicStats() {
	$('#points').html(cells[curI][curJ].points);
	defPointsColor(cells[curI][curJ].points);
	$('#building').html(cells[curI][curJ].building);
	$('#tanks').html("<img src='" + curTank + "'>" + cells[curI][curJ].tanks);
	$('#soldiers').html("<img src='" + curSoldier + "'>" + cells[curI][curJ].soldiers);
	$('#helics').html("<img src='" + curHelic + "'>" + cells[curI][curJ].helics);
}

function setReactor() {
	var cellPic  = $('#c' + curI + curJ).html();
	if (cells[curI][curJ].our) {
		curTank = 'src/tank.png'; curSoldier = 'src/soldat.png'; curHelic = 'src/helic.png';
	} else {
		curTank = 'src/ant.png'; curSoldier = 'src/rabbit.png'; curHelic = 'src/ptero.png';
	};
	
	$('#reactor').html("<div id='cellPic' class='cell'>" + cellPic + "</div><div class='stats' id='points'></div><div class='stats' id='building'></div><div class='forces' id='tanks'><img src='" + curTank + "'></div><div class='forces' id='soldiers'><img src='" + curSoldier + "'></div><div class='forces' id='helics'><img src='" + curHelic +"'></div></div>");
    
    if (cells[curI][curJ].our) {$('#reactor').append("<div id='left' class='arrow' onclick='sendForces(0, -1)'></div><div id='bottom' class='arrow' onclick='sendForces(1, 0)'></div><div id='top' class='arrow' onclick='sendForces(-1, 0)'></div><div id='right' class='arrow' onclick='sendForces(0, 1)'></div>")};
	
	if (cells[curI][curJ].building == 'factory') {$('#reactor').append("<button class='recBtn' onclick='trainForces(curI, curJ)'>Train</button>")}
    
    if (cells[curI][curJ].building == 'repairStation') {$('#reactor').append("<button class='recBtn' onclick='developRepairKit()'>Develop a repair kit</button>")}
    
    if (cells[curI][curJ].building == 'rocketStation') {$('#reactor').append("<button class='recBtn' onclick='launchRocket()'>Launch the rocket</button>")}
	
	if (cells[curI][curJ].our) {$('#reactor').append("<button class='recBtn' onclick='showBuildings(curI, curJ)'>Build</button>")};
	
	dynamicStats();
    hideCoordinates();
	statsUpdate = setInterval(dynamicStats, 1000);
}

function react(i, j) {   
	clearInterval(statsUpdate); // cнятие прошлого интервала
	$('#c' + curI + curJ).css('border', '2px solid black'); // снятие выделения
	curI = i; curJ = j;
	setReactor();
	$('#c' + curI + curJ).css('border', '2px solid #EEEEEE'); // постановка выделения
}

function build(i, j, type) {
	switch(type) { 
		case 1:  if (money > 99) {money -= 100; $('#c'+i+j).html('<img src="src/stabb.gif">'); cells[i][j].building = 'stabb'; animateCell('training', i, j, i, j, 0.4); callCooldowns()}
		else {insuffMoney()}; break;
		case 2: if (money > 199) {money -= 200; $('#c'+i+j).html('<img src="src/factory.gif">'); cells[i][j].building = 'factory'; animateCell('training', i, j, i, j, 0.4); callCooldowns()} 
		else {insuffMoney()}; break;
		case 3: if (money > 299) {money -= 300; $('#c'+i+j).html('<img src="src/fortress.gif">'); cells[i][j].building = 'fortress'; animateCell('training', i, j, i, j, 0.4); callCooldowns()}
		else {insuffMoney()}; break;
		case 4: if (money > 399) {money -= 400; $('#c'+i+j).html('<img src="src/studio.gif">'); cells[i][j].building = 'studio'; animateCell('training', i, j, i, j, 0.4); showNews(); callCooldowns()}
		else {insuffMoney()}; break;
        case 5: if (money > 499) {money -= 500; $('#c'+i+j).html('<img src="src/repairStation.gif">'); cells[i][j].building = 'repairStation'; animateCell('training', i, j, i, j, 0.4); callCooldowns()}
        else {insuffMoney()}; break;
        case 6: if (money > 599) {money -= 600; $('#c'+i+j).html('<img src="src/rocketStation.gif">'); cells[i][j].building = 'rocketStation'; animateCell('training', i, j, i, j, 0.4); callCooldowns()}
        else {insuffMoney()}; break;
	}
}

function showBuildings(i, j) {
	clearInterval(statsUpdate);
	$('#reactor').html("<div class='cell margin highlight' onclick='build(curI, curJ, 1)'><img src='src/stabb.gif'></div><div class='cell margin highlight' onclick='build(curI, curJ, 2)'><img src='src/factory.gif'></div><div class='cell margin highlight' onclick='build(curI, curJ, 3)'><img src='src/fortress.gif'></div><div class='cell margin highlight' onclick='build(curI, curJ, 4)'><img src='src/studio.gif'></div><div class='cell margin highlight' onclick='build(curI, curJ, 5)'><img src='src/repairStation.gif'></div><div class='cell margin highlight' onclick='build(curI, curJ, 6)'><img src='src/rocketStation.gif'></div><button class='recBtn' onclick='setReactor()'>Return</button>")
}