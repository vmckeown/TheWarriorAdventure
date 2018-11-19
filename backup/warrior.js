const PLAYER_MOVE_SPEED = 3.0;

function warriorClass() {
	this.x = 65;
	this.y = 100;
	this.speed = 0;
	this.myWarriorPic; // which picture to use
	this.name = "Untitled warrior";
	this.keysHeld = 0;
	this.health = 4;
	
	this.keyHeld_WalkNorth = false;
	this.keyHeld_WalkSouth = false;
	this.keyHeld_WalkWest = false;
	this.keyHeld_WalkEast = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;
	
	this.setupInput = function(upKey, rightKey, downKey, leftKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;	
	}

	this.reset = function(whichImage, warriorName) {
		this.name = warriorName;
		this.myWarriorPic = whichImage;
		this.keysHeld = 0;
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
	} // end of warriorRest func
	
	this.updateReadout = function() {
	document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
	}

	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;
		
		if(this.keyHeld_WalkNorth) {
			nextY -= PLAYER_MOVE_SPEED;
			this.myWarriorPic = warriorPicNorth

		}
		if(this.keyHeld_WalkSouth) {
			nextY += PLAYER_MOVE_SPEED;
			this.myWarriorPic = warriorPicSouth;
		}
		if(this.keyHeld_WalkWest) {
			nextX -= PLAYER_MOVE_SPEED;
			this.myWarriorPic = warriorPicWest;
		}
		if(this.keyHeld_WalkEast) {
			nextX += PLAYER_MOVE_SPEED;
			this.myWarriorPic = warriorPicEast;
		}
		
		var walkIntoTileIndex = getTileTypeAtPixelCoord(nextX, nextY);
        var walkIntoTileType = TILE_WALL;

		if(walkIntoTileIndex != undefined) {
			walkIntoTileType = roomGrid[walkIntoTileIndex];
		}

		switch(walkIntoTileType) {
			case TILE_ROAD:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_FINISH:
				console.log(this.name + " WINS!");
				nextLevel();
				break;
			case TILE_DOOR:
				if(this.keysHeld > 0) {
					this.keysHeld--; // one less key
					this.updateReadout();
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
					doorSound.play();
				}
				break;
			case TILE_KEY:
				this.keysHeld++; // one more key
				this.updateReadout();
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				keySound.play();
				break;
			case TILE_SPIKES:
				var i = 1;
				this.x = nextX;
				this.y = nextY;
				this.health = this.health - .5; // Damage to Health
				this.updateReadout();
				roomGrid[walkIntoTileIndex] = TILE_SPIKES_BLOODY;
				spikeSound.play();
				break;
			case TILE_SPIKES_BLOODY:
				var i = 1;
				this.x = nextX;
				this.y = nextY;
				this.updateReadout();
				break;
			case TILE_WALL:
			default:
				break;
		}
	}
	
	this.checkMyShipAndShotCollisionAgainst = function(thisEnemy) {
		if( thisEnemy.isOverlappingPoint(this.x,this.y) ) {
			document.getElementById("debugText").innerHTML = "Bat bite the Warrior!";
			this.health = (this.health)-(1/32); // Damage to Health
		}
	}

	this.draw = function() {
			drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y, 0)
	}
	
	
	
	
	
}