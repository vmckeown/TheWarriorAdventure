const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_SPACEBAR = 32;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);
	
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	
	redWarrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_SPACEBAR);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
	
}

function keySet(keyEvent, redWarrior, setTo) {
	if(keyEvent.keyCode == redWarrior.controlKeyLeft) {
		redWarrior.keyHeld_WalkWest = setTo;
	}
	if(keyEvent.keyCode == redWarrior.controlKeyRight) {
		redWarrior.keyHeld_WalkEast = setTo;
	}
	if(keyEvent.keyCode == redWarrior.controlKeyUp) {
		redWarrior.keyHeld_WalkNorth = setTo;
	}
	if(keyEvent.keyCode == redWarrior.controlKeyDown) {
		redWarrior.keyHeld_WalkSouth = setTo;
	}	
}

function keyPressed(evt) {
	keySet(evt, redWarrior, true);
	if(evt.keyCode == redWarrior.controlKeySword) {
		redWarrior.swordSwing(); 
	}
    evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
	keySet(evt, redWarrior, false);
}

function handleMouseClick(evt) {
	if(menuScreen) {
		menuScreen = false;
	}
}

