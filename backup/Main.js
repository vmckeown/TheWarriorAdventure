var canvas, canvasContext;
var redWarrior = new warriorClass();
var bat1 = new batClass();

// Sound

var doorSound = new SoundOverlapsClass("woodDoorOpen");
var keySound = new SoundOverlapsClass("keys");
var spikeSound = new SoundOverlapsClass("spikes");
//var backgroundMusic = new BackgroundMusicClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	
	colorRect(0,0, canvas.width,canvas.height, 'orange'); // startup page
	colorText("Dungeon Game", 400, 300, 'black');
	
	loadImages();
	backgroundMusic.loopSong("dungeonbackground");
}

function imageLoadingDoneSoStartGame() {	
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
	
	setupInput();
	
	loadLevel(levelOne);

}

function nextLevel() {
	levelNow++;
	console.log(levelList.length);
	if(levelNow > levelList.length) {
		levelNow = 0;
	}
	loadLevel(levelList[levelNow]);
}

function loadLevel(whichLevel) {	
	roomGrid = whichLevel.slice();
	redWarrior.reset(warriorPicNorth, "Red warrior");
	bat1.reset(batPic);
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	redWarrior.move();
	bat1.move();
	redWarrior.checkMyShipAndShotCollisionAgainst(bat1);

}

function health() {
	if (redWarrior.health >= 0) {
	colorRect(700,20,10,20, 'green'); // 0.5 HP
	} if (redWarrior.health < .5) {
	colorRect(700,20,10,20, 'red'); // 0.5 HP //
	} if (redWarrior.health >= .5) {
	colorRect(710,20,10,20, 'green'); // 0.5 HP
	} if (redWarrior.health < 1) {
 	colorRect(710,20,10,20, 'red'); // 0.5 HP //
	} if (redWarrior.health >= 1) {
	colorRect(725,20,10,20, 'green'); // 1 HP **********
	} if (redWarrior.health < 1.5) {
	colorRect(725,20,10,20, 'red'); // 1 HP //  
	} if (redWarrior.health >= 1.5) {
	colorRect(735,20,10,20, 'green'); // 1.5 HP	
	} if (redWarrior.health < 2 ) {
	colorRect(735,20,10,20, 'red'); // 1.5 HP //
	} if (redWarrior.health >= 2) {
	colorRect(750,20,10,20, 'green'); // 2 HP ***********
	} if (redWarrior.health < 2.5) {
	colorRect(750,20,10,20, 'red'); // 2 HP 
	} if (redWarrior.health >= 2.5) {
	colorRect(760,20,10,20, 'green'); // 2.5 HP
	} if (redWarrior.health < 3) {
	colorRect(760,20,10,20, 'red'); // 2.5 HP
	} if (redWarrior.health >= 3) {
	colorRect(775,20,10,20, 'green'); // 3 HP ******************
	} if (redWarrior.health < 3.5) {
	colorRect(775,20,10,20, 'red'); // 3 HP
	} if (redWarrior.health >= 3.5) {
	colorRect(785,20,10,20, 'green'); // 3.5 HP
	} if (redWarrior.health < 4) {
	colorRect(785,20,10,20, 'red'); // 3.5 HP
	}
	
	if (redWarrior.health <= 0) {
		resetLevel();
	}
}

function drawAll() {
	drawRoom();
	redWarrior.draw();
	bat1.draw();
	health();
	
}