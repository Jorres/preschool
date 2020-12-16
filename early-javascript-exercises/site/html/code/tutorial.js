var curBuild, curForce, curPage;
const LASTBUILD = 9;
const LASTFORCE = 6;
const LASTPAGE = 2;
var buildInfo = [], forceInfo = [], pages = [];

buildInfo[0] = {
    image: '<img src="src/stabb.gif">',
    text: 'This is a stabb. It helps you to earn money to hire warriors and build other structures.'
}
buildInfo[1] = {
    image: '<img src="src/factory.gif">',
    text: 'This building allows you to hire soldiers and construct helicopters and tanks.'
}
buildInfo[2] = {
    image: '<img src="src/fortress.gif">',
    text: 'This structure has increased toughness to protect itself from enemy attacks.'
}
buildInfo[3] = {
    image: '<img src="src/studio.gif">',
    text: 'This is a news station. It gives you access to the latest events on the planet.'
}
buildInfo[4] = {
    image: '<img src="src/repairStation.gif">',
    text: 'This is a repair station. It allows you to create repair kits to repair your buildings.'
}
buildInfo[5] = {
    image: '<img src="src/rocketStation.gif">',
    text: 'This is a rocket station, carramba! Dirty dwarves gotta BOOM your enemy!'
}
buildInfo[6] = {
    image: '<img src="src/forest.gif">',
    text: 'This is a forest. It\'s livers are ants. Use tanks to fight them easily.'
}
buildInfo[7] = {
    image: '<img src="src/field.gif">',
    text: 'This is a field. It\'s livers are crazy rabbids. Use soldiers to fight them easily.'
}
buildInfo[8] = {
    image: '<img src="src/rock.gif">',
    text: 'This is a rocky location. Here live pterodactiles. Use helicopters to conquer them.'
}

forceInfo[0] = {
    image: '<img src="src/soldat.png">',
    text: 'Soldiers are the brave forces of Republic!'
}
forceInfo[1] = {
    image: '<img src="src/tank.png">',
    text: 'Tanks - brave steel machines to deal with every enemy on  its way!'
}
forceInfo[2] = {
    image: '<img src="src/helic.png">',
    text: 'Helicopters - the only way to reach difficult locations!'
}
forceInfo[3] = {
    image: '<img src="src/ant.png">',
    text: 'Ants live in forests. Tanks are the best forces to deal with them.'
}
forceInfo[4] = {
    image: '<img src="src/rabbit.png">',
    text: 'Rabbids live in fields. Soldiers are the best forces to deal with them.'
}
forceInfo[5] = {
    image: '<img src="src/ptero.png">',
    text: 'Pterodactiles live in rocky locations. Helicopters are the best forces to deal with them.'
}

pages[0] = {
    text: "<p>Greetings, brave commander! Republic forces has recently deployed to an unknown planet, but the avangard has already faced up some hard conjunction from the side of aborigens. Get these instructions and get them hell out of here! Good luck!</p>  <div id='intro'><img src='src/stabb.gif'>Treat surface of this planet as cells. You control armies and buildings on these cells. The goal is to capture every enemy cell on a planet. Information about armies and buildings can be found through this tutorial.</div> <br><p>You can pause the game any time pressing on this button: </p><img src='src/pause.png'> <br><br><button class='recBtn' onclick='nextPage(1)'>Next Page</button><button class='recBtn' onclick='toStart()'>Return</button>"
}
pages[1] = {
    text: "<p>Before we will teach you, how to manage your armies, let yourself take a look to different types of buildings, which you will find on your battlefield.</p><div id='buildingsInfo' class='info'><div id='curBuildImg'></div><p id='curBuildDesc'>Check arrows to see the buildings!</p><img src='src/leftarrow.png' onclick='setBuilding(-1)'><img src='src/rightarrow.png' onclick='setBuilding(1)'> </div>  <div id='forcesInfo' class='info'><div id='curForceImg'></div><p id='curForceDesc'>Check arrows to see the forces!</p><img src='src/leftarrow.png' onclick='setForces(-1)'><img src='src/rightarrow.png' onclick='setForces(1)'></div>  <br><button class='recBtn' onclick='nextPage(-1)'>Previous Page</button> <button class='recBtn' onclick='nextPage(1)'>Next Page</button><button class='recBtn' onclick='toStart()'>Return</button>"
}

pages[2] = {
    text: "<p>Every cell is able to hold different types of forces in, but starting from this, buildings don\'t have a lot of in common. However, look at the example of the control screen, which you will use through the game. <br><br> In the center you can see the picture of the current cell - a stabb on this example. This picture is surrounded by some red arrows - you will need to press them to send forces from this cell to neighbor cell - including attacking enemy ones! <br><br> Then you can see the green line with some weird digits... They are very easy to understand - this are HP of your building. Then - line with a name of the building.<br><br> The next three cells show you, how much soldiers, tanks and helicopters do you have in this cell. When you try to send them away from this cell to the other, everyone will follow your order.<br><br> This is everything, that you need to know to start your career as a commanser! Good luck! (Honestly, not everything, but i will add everything later. I promise!)</p><img src='src/reactorSample.PNG'><button class='recBtn' onclick='nextPage(-1)'>Previous Page</button><button class='recBtn' onclick='toStart()'>Return</button>"
}

function showTutorial() {
    curBuild = curForce = -1;
    $('#startGame').css('transform', 'translate3d(0px, 1800px, 0px)');
    $('#tutorial').css('transform', 'translate3d(2100px, 0px, 0px)');
    
    curPage = 0;
    $('#tutorial').html(pages[curPage].text);

    
    //Здравствуй, бравый солдат! Наши доблестные силы высадились на неизвестную планету, но передовые части уже столкнулись с жестким военным сопротивлением. Злостные энты и птеродактили осаждают нашу инфраструктуру! Получите эти инструкции, командир, и разберитесь с ними! 
}

function toStart() {
    $('#startGame').css('transform', 'translate3d(0px, 0px, 0px)');
    $('#tutorial').css('transform', 'translate3d(-2100px, 0px, 0px)');
}

function setBuilding (shift) {
    if ((curBuild + shift >= 0)&&(curBuild + shift < LASTBUILD)) {
        curBuild += shift;
        $('#curBuildImg').html(buildInfo[curBuild].image);
        $('#curBuildDesc').html(buildInfo[curBuild].text);
    }
}

function setForces (shift) {
    if ((curForce + shift >= 0)&&(curForce + shift < LASTFORCE)) {
        curForce += shift;
        $('#curForceImg').html(forceInfo[curForce].image);
        $('#curForceDesc').html(forceInfo[curForce].text);
    }
}

function nextPage(diff) {
    if ((curPage + diff >= 0)&&(curPage + diff <= LASTPAGE)) {
        curPage += diff;
        $('#tutorial').html(pages[curPage].text);
        if (curPage == 2) { // костыль для красивого дизайна одной из страничек
            $('#tutorial>img').css('float', 'right');
            $('#tutorial>p').css('width', '640px');
        } else {
            $('#tutorial>img').css('float', 'left');
            $('#tutorial>p').css('width', 'auto');
        };
        
    }
}