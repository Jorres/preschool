const timeToCheck = 100;

function tutorialBeforeBot() {
    talk(280, 140, 240, tutorialDialog);
    
    setTimeout(function () {
        botTime();
    }, LETTERTIME * 500);
}

function botTime() {
    createEnemy(400, 20, 'Training');
    var destroyed = false;
    
    setTimeout( function () {
        checkIfBot();
    }, timeToCheck);
}

function checkIfBot() {
    var arr = Crafty('Training').get();
    if (arr[0] !== undefined) {
        setTimeout( function () {
            checkIfBot();
        }, timeToCheck);
    } else if (!recDied) {
        tutorialAfterBot();
    }
}

function tutorialAfterBot() {
    talk(280, 140, 240, afterCombatDialog);
    setTimeout(function () {
        checkIfAlphaAfterBot();
    }, timeToCheck);
}

function checkIfAlphaAfterBot() {
    if (curGalaxy == 1) {
        talk(280, 140, 240, onAlphaArrival);
        createInvButton();
        addToInv('captainHead', 'captainHead');
        setTimeout(function () {
            checkIfInvOpened();
        }, timeToCheck);
    } else {
        setTimeout(function () {
            checkIfAlphaAfterBot();
        }, timeToCheck);
    }
}

function checkIfInvOpened() {
    if (invOpened) {
        talk(480, 110, 240, invTeachingDialog);
        setTimeout(function () {
            checkIfBeta();
        }, timeToCheck);
    } else {
        setTimeout(function () {
            checkIfInvOpened();
        }, timeToCheck);
    }
}

function checkIfBeta() {
    if (curGalaxy == 2) {
        talk(280, 140, 240, onBetaArrival);
        rmvFromInv('captainHead');
        setTimeout(function () {
            createEnemy(280, 140, 'BetaPirate');
            createEnemy(180, 140, 'BetaPirate');
            createEnemy(230, 200, 'BetaPirate');
            
            setTimeout(function () {
                checkIfBetaPiratesDestroyed();
            }, timeToCheck);
            
        }, LETTERTIME * 300);
    } else {
        setTimeout(function () {
            checkIfBeta();
        }, timeToCheck);
    }
}

function checkIfBetaPiratesDestroyed() {
    var arr = Crafty('BetaPirate').get();
    if ((arr[0] !== undefined) && (!recDied)) {
        setTimeout( function () {
            checkIfBetaPiratesDestroyed();
        }, timeToCheck);
    } else {
        onBetaPiratesDestroyed();
    }
}

function onBetaPiratesDestroyed() {
    talk(280, 140, 240, onSavingBetaSystem);
    
    setTimeout(function () {
        checkIfAlphaAfterBeta();
    }, timeToCheck);
}

function checkIfAlphaAfterBeta() {
    if (curGalaxy == 1) {
        talk(280, 140, 240, showingUpgradeScreen);
        upgradesReached = true; // чтобы не показать во время туториала апгрейдное окно
    } else {
        setTimeout(function () {
            checkIfAlphaAfterBeta();
        }, timeToCheck);
    }
}

