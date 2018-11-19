// Characters

var canvas, canvasContext;
var redWarrior = new warriorClass();
var bat1 = new batClass();
var bat2 = new batClass();
var skeleton = new skeletonClass();
var skeleton2 = new skeletonClass();
var zombie = new zombieClass();
var zombie2 = new zombieClass();

// Game State

var menuScreen = true;

// Sound

var doorSound = new SoundOverlapsClass("woodDoorOpen");
var keySound = new SoundOverlapsClass("keys");
var spikeSound = new SoundOverlapsClass("spikes");
var backgroundMusic = new BackgroundMusicClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	
	colorRect(0,0, canvas.width,canvas.height, 'orange'); // startup page
	colorText("Loading Images... please wait", 400, 300, 'black');	
	loadImages();
	canvas.addEventListener('mousedown',handleMouseClick);
	//backgroundMusic.loopSong("dungeonbackground");
}

function imageLoadingDoneSoStartGame() {	
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
	
	setupInput();
	
	loadLevel(levelOne);

}

function nextLevel() {
	levelNow++;
	if(levelNow > levelList.length) {
		levelNow = 0;
	}
	loadLevel(levelList[levelNow]);
}

function loadLevel(whichLevel) {	
	roomGrid = whichLevel.slice();
	redWarrior.reset(warriorPic, "Red warrior");
	skeleton.reset(skeletonPic);
	skeleton2.reset(skeletonPic);
	zombie.reset(zombiePic);
	zombie2.reset(zombiePic);
	bat1.reset(batPic);
	bat2.reset(batPic);
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	if(menuScreen){
		// no movement
	} else { 
		redWarrior.move();
		bat1.move();
		bat2.move();
		skeleton.move();
		skeleton2.move();
		zombie.move();
		zombie2.move();
		if(bat1.health > 0){
			redWarrior.checkMyShipAndShotCollisionAgainst(bat1);
		}
		if(bat2.health > 0){
			redWarrior.checkMyShipAndShotCollisionAgainst(bat2);
		}
		if(skeleton.health > 0){
			redWarrior.checkMyShipAndShotCollisionAgainst(skeleton);
		}
		if(skeleton2.health > 0){
			redWarrior.checkMyShipAndShotCollisionAgainst(skeleton2);
		}
		if(zombie.health > 0){
			redWarrior.checkMyShipAndShotCollisionAgainst(zombie);
		}
		if(zombie2.health > 0){
			redWarrior.checkMyShipAndShotCollisionAgainst(zombie2);
		}
		cameraFollow();	
	};
};

function health() {
	colorRect(695,15,115,30, 'black');
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
		if(menuScreen){
			canvasContext.drawImage(titlepagePic, 0,0);  // blanks out the screen
			canvasContext.font="30px Georgia";
			colorText("Welcome to Vince's Warrior Legend!", 120, 100, "white");				
			canvasContext.font="20px Georgia";
			colorText("This game is still Work in Progress, but playable!", 170, 150, "white");	
			colorText("Move from level to level by collecting keys.", 170, 200, "white");	
			colorText("Kill monsters with your sword, and collect gold.", 170, 225, "white");	
			colorText("Click to start", 170, 255, "white");
			canvasContext.font="15px Georgia";
			colorText("Move Left - A", 170, 300, "white");	
			colorText("Move Down - S", 170, 325, "white");
			colorText("Move Right - D", 170, 350, "white");
			colorText("Move Up - W", 170, 375, "white");
			colorText("Sword Attack - Space bar", 170, 400, "white");
				} else {
			canvasContext.save();
			canvasContext.translate(-camPanX,-camPanY);
			drawRoom();
			drawOnlyTilesOnScreen();
			redWarrior.draw();
			bat1.draw();
			bat2.draw();
			skeleton.draw();
			skeleton2.draw();
			zombie.draw();
			zombie2.draw();
			canvasContext.restore();
			health();
		}
}