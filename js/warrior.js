var playerMoveSpeed = 3.0;
var direction = "south";

function warriorClass() {
	this.mySword = new swordClass();
	this.myArrow = new arrowClass(); 
	this.arrowList = [];
	this.x = 65;
	this.centerX = 40;
	this.y = 100;
	this.centerY = 80;
	this.head = this.y - 25;
	this.feet = this.y + 25;
	this.leftArm = this.x + 25;
	this.rightArm = this.x - 25;
	this.speed = 0;
	this.myWarriorPic = warriorPic; // which picture to use
	this.name = "Untitled warrior";
	this.keysHeld = 0;
	this.goldpieces = 10;
	this.health = 4;
	this.waitTime = 0;
	this.previousTileType = -1;
	this.sx = 40;
	this.sy = 0;
	this.tickCount = 0;
	this.frameIndex = 0;
	this.width = 40;
	this.numberOfFrames = 4;
	this.height = 50;
	this.ticksPerFrame = 5;
	this.playerMove = false;
	
	
	this.keyHeld_WalkNorth = false;
	this.keyHeld_WalkSouth = false;
	this.keyHeld_WalkWest = false;
	this.keyHeld_WalkEast = false;
	this.keyHeld_Sword = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;
	this.controlKeySword;
	
	this.setupInput = function(upKey, rightKey, downKey, leftKey, swordKey, arrowKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;	
		this.controlKeySword = swordKey;
		this.controlKeyArrow = arrowKey;
	}

	this.releaseKeys = function(){
		this.keyHeld_WalkNorth = false;
		this.keyHeld_WalkSouth = false;
		this.keyHeld_WalkWest = false;
		this.keyHeld_WalkEast = false;
		this.keyHeld_Sword = false;
	}
	
	this.reset = function(whichImage, warriorName) {
		this.name = warriorName;
		this.myWarriorPic;
		this.yellowKeysHeld = 0;
		this.greenKeysHeld = 0;
		this.blueKeysHeld = 0;
		this.redKeysHeld = 0;
		this.health = 4;
		this.updateReadout();
		
		for(var eachRow=0;eachRow<ROOM_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<ROOM_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if(roomGrid[arrayIndex] == TILE_PLAYERSTART) {
					roomGrid[arrayIndex] = TILE_ROAD;
					this.x = eachCol * TILE_W + TILE_W/2;
					this.y = eachRow * TILE_H + TILE_H/2;
					return;
				} // end of Player Start if
			} //end of col row for
		} // end of row for
		console.log("No Player Start found!");
		this.mySword.reset();
		this.myArrow.reset();
	} // end of warriorRest func
	
	this.updateReadout = function() {
	document.getElementById("inventory").innerHTML = "Arrows: " + redWarrior.myArrow.arrowQuantity + "<br>Yellow Keys: " + this.yellowKeysHeld + "<br>Red Keys: " + this.redKeysHeld + "<br>Green Keys: " + this.greenKeysHeld + "<br>Blue Keys: " + this.blueKeysHeld + "<br>Gold Pieces: " + this.goldpieces;
	}

	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;
				
		if(this.keyHeld_WalkNorth) {
			nextY -= playerMoveSpeed;
			direction = "north";
			this.sx = 0;
			this.sy = 50;
		}
		if(this.keyHeld_WalkSouth) {
			nextY += playerMoveSpeed;
			direction = "south";
			this.sx = 0;
			this.sy = 0;
		}
		if(this.keyHeld_WalkWest) {
			nextX -= playerMoveSpeed;
			direction = "west";
			this.sx = 0;
			this.sy = 100;
		}
		if(this.keyHeld_WalkEast) {
			nextX += playerMoveSpeed;
			direction = "east";
			this.sx = 0;
			this.sy = 150;
		}

		if(this.keyHeld_WalkNorth || this.keyHeld_WalkSouth || this.keyHeld_WalkWest || this.keyHeld_WalkEast) {
			this.playerMove = true;
		} else { 
			this.playerMove = false;
		}
		
		
		var walkIntoTileIndex = getTileTypeAtPixelCoord(nextX, nextY);
        var walkIntoTileType = TILE_WALL;

		if(direction == "north") {
			walkIntoTileIndex = getTileTypeAtPixelCoord(nextX+(this.width/2),nextY);
		}
		if(direction == "south") {
			walkIntoTileIndex = getTileTypeAtPixelCoord(nextX+(this.width/2),nextY+this.height);
		}
		if(direction == "west") {
			walkIntoTileIndex = getTileTypeAtPixelCoord(nextX, nextY+(this.height/2));
		}
		if(direction == "east") {
			walkIntoTileIndex = getTileTypeAtPixelCoord(nextX+this.width, nextY+(this.height/2));
		}		
		if(walkIntoTileIndex != undefined) {
			walkIntoTileType = roomGrid[walkIntoTileIndex];
		}

		switch(walkIntoTileType) {
			case TILE_ROAD:
				playerMoveSpeed = 3.0;
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_GRASS:
				playerMoveSpeed = 2.0;
				this.x = nextX;
				this.y = nextY;
				break;	
			case TILE_GRAVE_YARD_PORTAL:
				loadLevel(graveYard);
				break;	
				
			case TILE_HOME_VILLAGE_PORTAL:
				loadLevel(levelOne);
				break;	
			case TILE_FINISH:
				console.log(this.name + " WINS!");
				nextLevel();
				break;
			case TILE_SHOP_A:
				if(walkIntoTileType != this.previousTileType){
					this.releaseKeys();
					isInShop = true;
				}
				break;
			case TILE_YELLOW_DOOR:
				if(this.yellowKeysHeld > 0) {
					this.yellowKeysHeld--; // one less key
					this.updateReadout();
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
					document.getElementById("debugText").innerHTML = "I've used a yellow key.";
					doorSound.play();
				} else {
					document.getElementById("debugText").innerHTML = "I need a yellow key to open this door.";
				}
				break;
			case TILE_GREEN_DOOR:
				if(this.greenKeysHeld > 0) {
					this.greenKeysHeld--; // one less key
					this.updateReadout();
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
					document.getElementById("debugText").innerHTML = "I've used a green key.";
					doorSound.play();
				} else {
					document.getElementById("debugText").innerHTML = "I need a green key to open this door.";
				}
				break;
			case TILE_RED_DOOR:
				if(this.redKeysHeld > 0) {
					this.redKeysHeld--; // one less key
					this.updateReadout();
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
					document.getElementById("debugText").innerHTML = "I've used a red key.";
					doorSound.play();
				} else {
					document.getElementById("debugText").innerHTML = "I need a red key to open this door.";
				}
				break;
			case TILE_BLUE_DOOR:
				if(this.blueKeysHeld > 0) {
					this.blueKeysHeld--; // one less key
					this.updateReadout();
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
					document.getElementById("debugText").innerHTML = "I've used a blue key.";
					doorSound.play();
				} else {
					document.getElementById("debugText").innerHTML = "I need a blue key to open this door.";
				}
				break;	
			case TILE_YELLOW_KEY:
				this.yellowKeysHeld++; // one more key
				this.updateReadout();
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				document.getElementById("debugText").innerHTML = "I've found a yellow key.";
				keySound.play();
				break;
			case TILE_RED_KEY:
				this.redKeysHeld++; // one more key
				this.updateReadout();
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				document.getElementById("debugText").innerHTML = "I've found a red key.";
				keySound.play();
				break;
			case TILE_BLUE_KEY:
				this.blueKeysHeld++; // one more key
				this.updateReadout();
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				document.getElementById("debugText").innerHTML = "I've found a blue key.";
				keySound.play();
				break;
			case TILE_GREEN_KEY:
				this.greenKeysHeld++; // one more key
				this.updateReadout();
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				document.getElementById("debugText").innerHTML = "I've found a green key.";
				keySound.play();
				break;
			case TILE_TREASURE:
				if(this.yellowKeysHeld > 0) {
					this.yellowKeysHeld--; // one less key
					this.goldpieces = this.goldpieces + 50;
					redWarrior.myArrow.arrowQuantity = redWarrior.myArrow.arrowQuantity + 5;
					this.updateReadout();
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
					document.getElementById("debugText").innerHTML = "I've used a yellow key and found 50 gold pieces, and 5 arrows";
				} else {
					document.getElementById("debugText").innerHTML = "I need a yellow key to open this treasure chest.";
				}
				break;
			case TILE_GRAVE:
					document.getElementById("debugText").innerHTML = "Too many good people have died from the Skeleton King and his army of the dead.";
					colorText("Too many good people have died from the Skeleton King and his army of the dead.", this.x, this.y - 50, "black");
				break;
			case TILE_FRESH_GRAVE:
					document.getElementById("debugText").innerHTML = "I need to avenge my friend.  The Skeleton King and his army of the dead must be destroyed!.";
					colorText("I need to avenge my friend.  The Skeleton King and his army of the dead must be destroyed!.", this.x, this.y - 50,"black");
				break;
			case TILE_BED:
					document.getElementById("debugText").innerHTML = "I am not tired.";
				break;
			case TILE_CABINET:
					document.getElementById("debugText").innerHTML = "The bookcase is bare.  One day, I'll have a library of my own.";
				break;
			case TILE_SPIKES:
				var i = 1;
				this.x = nextX;
				this.y = nextY;
				this.health = this.health - 0.5; // Damage to Health
				this.updateReadout();
				roomGrid[walkIntoTileIndex] = TILE_SPIKES_BLOODY;
				spikeSound.play();
				break;
			case TILE_SPIKES_BLOODY:
				var i = 1;
				this.x = nextX;
				this.y = nextY;
				this.updateReadout();
				document.getElementById("debugText").innerHTML = "OUCH! Bloody Spikes!";
				break;
			case TILE_WALL:
			default:
				break;
			
		} // end of switch
		
		this.previousTileType = walkIntoTileType;
		this.mySword.move();
		this.myArrow.move();
	}	
	
	this.checkWarriorandSwordCollisionAgainst = function(thisEnemy) {
		
		this.centerX = this.x + this.width/2;
		this.centerY = this.y + this.height/2;

		if(thisEnemy.isOverlappingPoint(this.centerX,this.centerY)) {
			//empty
		}
		
		if( this.mySword.hitTest(thisEnemy) ) {
			//empty
		}
		
		if( this.myArrow.hitTest(thisEnemy) ) {
			//empty
		}
	}
	
	this.swordSwing = function() {
		if( this.mySword.isSwordReadyToSwing() ) {	
			this.mySword.shootFrom(this);
		}
	}
	
	this.shotArrow = function() {
		if( this.myArrow.isArrowReadyToShot() ) {	
			this.myArrow.shootFrom(this);
		}
	}
	
	this.draw = function() { 
		if(this.playerMove) {
			this.tickCount++;
		}
		if (this.tickCount > this.ticksPerFrame) {
			this.tickCount = 0;
			if(this.frameIndex < this.numberOfFrames-1) {
				this.frameIndex += 1;
			} else {
				this.frameIndex = 0;
			}
		}
			
		this.sx = this.frameIndex * this.width;
		
		canvasContext.drawImage(this.myWarriorPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
/*		colorRect(this.x,this.y, 5,5, "white") 
		colorRect(this.x,this.y+this.height, 5,5, "white")
		colorRect(this.x+this.width,this.y, 5,5, "white")
		colorRect(this.x+this.width,this.y+this.height, 5,5, "white")
				
		colorRect(this.centerX,this.centerY, 5, 5, 'white') */
		
		this.mySword.draw();
			
		this.myArrow.draw();
	
		}
	}
	
function instantCamFollow() {
    camPanX = redWarrior.x - canvas.width/2;
    camPanY = redWarrior.y - canvas.height/2;
}

function cameraFollow() {
    var cameraFocusCenterX = camPanX + canvas.width/2;
    var cameraFocusCenterY = camPanY + canvas.height/2;

    var playerDistFromCameraFocusX = Math.abs(redWarrior.x-cameraFocusCenterX);
    var playerDistFromCameraFocusY = Math.abs(redWarrior.y-cameraFocusCenterY);

    if(playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
      if(cameraFocusCenterX < redWarrior.x)  {
        camPanX += playerMoveSpeed;
      } else {
        camPanX -= playerMoveSpeed;
      }
    }
    if(playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
      if(cameraFocusCenterY < redWarrior.y)  {
        camPanY += playerMoveSpeed;
      } else {
        camPanY -= playerMoveSpeed;
      }
    }
	
	if(camPanX < 0) {
      camPanX = 0;
    }
    if(camPanY < 0) {
      camPanY = 0;
    }
    var maxPanRight = ROOM_COLS * TILE_W - canvas.width;
    var maxPanTop = ROOM_ROWS * TILE_H - canvas.height;
    if(camPanX > maxPanRight) {
      camPanX = maxPanRight;
    }
    if(camPanY > maxPanTop) {
      camPanY = maxPanTop;
    }
  }
	
