const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);
	
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	
	redWarrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW); 
	
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
	
}

function keySet(keyEvent, setTo) {
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
	keySet(evt, true);
}

function keyReleased(evt) {
	keySet(evt, false);
}

