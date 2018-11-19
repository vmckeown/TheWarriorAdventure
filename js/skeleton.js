var skeletonMoveSpeed = 0.5;
const SKELETON_TIME_BETWEEN_CHANGE_DIR = 700;
const SKELETON_COLLISION_RADIUS = 20;

function skeletonClass() {
	this.x = 0;
	this.y = 0;
	this.speed = 1;
	this.mySkeletonPic = skeletonPic; // which picture to use
	this.name = "Untitled skeleton";
	this.health = 2;
	this.alive = true;
	this.biteReady = true;
	this.biteReadyTicker = 30;
	
	this.cyclesTilDirectionChange = 0;
	this.addedCyclesTilDirectionChange = 0;
	this.cyclesOfSkeletonActive = 0;
	this.cyclesofSkeletonResting = Math.random()*400;
	this.skeletonResting = false;
	this.skeletonRestingTime = Math.random()*400;
	
	this.sx = 50;
	this.sy = 0;
	this.tickCount = 0;
	this.frameIndex = 0;
	this.width = 50;
	this.numberOfFrames = 4;
	this.height = 50;
	this.ticksPerFrame = 5;
	this.skeletonMove = true;
	this.walkNorth = false;
	this.walkEast = false;
	this.walkSouth = true;
	this.walkWest = false;

	this.reset = function(whichImage, skeletonName) {
		this.name = skeletonName;
		this.mySkeletonPic;

		this.health = 2;
		
		for(var eachRow=0;eachRow<ROOM_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<ROOM_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if(roomGrid[arrayIndex] == TILE_SKELETON) {
					roomGrid[arrayIndex] = TILE_ROAD;
					this.x = eachCol * TILE_W + TILE_W/2;
					this.y = eachRow * TILE_H + TILE_H/2;
					return;
				} // end of Player Start if
			} //end of col row for
		} // end of row for
		console.log("No Skeleton Start found!");
	} // end of skeletonRest func
	
	this.changeDirection = function() {
		if(this.walkNorth == true) {
			this.walkNorth = false;
			this.walkEast = true;
		} else if(this.walkWest == true) {
			this.walkWest = false;
			this.walkNorth = true;
		} else if(this.walkEast == true) {
			this.walkEast = false;
			this.walkSouth = true;
		} else if(this.walkSouth == true) {
			this.walkSouth = false;
			this.walkWest = true;
		}	
	}
	
	this.skeletonBite = function() {
		console.log(this.biteReadyTicker);
		console.log(this.biteReady);
		console.log(redWarrior.health);
		if(this.biteReady == true){
			redWarrior.health = redWarrior.health -1;	
			document.getElementById("debugText").innerHTML = "Ouch!  I've been bit by a skeleton.";	
			this.biteReady = false;
		}
		else if(this.biteReady == false) {	
			this.biteReadyCounter();
		}
	}
	
	this.biteReadyCounter = function() {
		if(this.biteReadyTicker > 0){ 
			this.biteReadyTicker--;
		} else if(this.biteReadyTicker <= 0){
			this.biteReadyTicker = 30;
			this.biteReady = true;
		}
	}
	
	

	
	this.move = function() {
		var nextX = this.x; 
		var nextY = this.y;
		
		if(this.health > 0){
					
			this.cyclesTilDirectionChange--;
			if(this.cyclesTilDirectionChange <= 0) {
				if(this.addedCyclesTilDirectionChange <= 0) {
					this.cyclesTilDirectionChange = SKELETON_TIME_BETWEEN_CHANGE_DIR;
					this.changeDirection();
					this.addedCyclesTilDirectionChange++; 
				}
				else if(this.addedCyclesTilDirectionChange == 1) {
					this.cyclesTilDirectionChange = SKELETON_TIME_BETWEEN_CHANGE_DIR;
					this.changeDirection();
					this.addedCyclesTilDirectionChange++;
				}
				else if(this.addedCyclesTilDirectionChange == 2) {
					this.cyclesTilDirectionChange = SKELETON_TIME_BETWEEN_CHANGE_DIR;
					this.changeDirection();
					this.addedCyclesTilDirectionChange++;
				}
				else if(this.addedCyclesTilDirectionChange == 3) {
					this.cyclesTilDirectionChange = SKELETON_TIME_BETWEEN_CHANGE_DIR;
					this.changeDirection();
					this.addedCyclesTilDirectionChange = 0;
				}
			}
			
			// which directional image to use

			if(this.walkNorth) {
				nextY -= skeletonMoveSpeed;
				this.sx = 0;
				this.sy = 50;
				skeletonDirection = "north";
			}
			
			if(this.walkSouth) {
				nextY += skeletonMoveSpeed;
				this.sx = 0;
				this.sy = 0;
				skeletonDirection = "south";
			}
			if(this.walkWest) {
				nextX -= skeletonMoveSpeed;
				this.sx = 0;
				this.sy = 100;
				skeletonDirection = "west";
			}
			if(this.walkEast) {
				nextX += skeletonMoveSpeed;
				this.sx = 0;
				this.sy = 150;
				skeletonDirection = "east";
			}
			
			var walkIntoTileIndex = getTileTypeAtPixelCoord(nextX, nextY);
			var walkIntoTileType = TILE_WALL;
			
			if(skeletonDirection == "north") {
				walkIntoTileIndex = getTileTypeAtPixelCoord(nextX,(nextY-25));
			}
			if(skeletonDirection == "south") {
				walkIntoTileIndex = getTileTypeAtPixelCoord(nextX,(nextY+25));
			}
			if(skeletonDirection == "west") {
				walkIntoTileIndex = getTileTypeAtPixelCoord((nextX-25), nextY);
			}
			if(skeletonDirection == "east") {
				walkIntoTileIndex = getTileTypeAtPixelCoord((nextX+25), nextY);
			}

			if(walkIntoTileIndex != undefined) {
				walkIntoTileType = roomGrid[walkIntoTileIndex];
			}

			switch(walkIntoTileType) {
				case TILE_ROAD:
					this.x = nextX;
					this.y = nextY;
					skeletonMoveSpeed = 0.5;
					break;
				case TILE_GRASS:
					this.x = nextX;
					this.y = nextY;
					skeletonMoveSpeed = 0.3;
					break;
				case TILE_TREE:
					this.changeDirection();
					break;
				case TILE_FINISH:
					this.changeDirection();
					break;
				case TILE_YELLOW_DOOR:
					this.changeDirection();
					break;
				case TILE_GREEN_DOOR:
					this.changeDirection();
					break;
				case TILE_RED_DOOR:
					this.changeDirection();
					break;
				case TILE_BLUE_DOOR:
					this.changeDirection();
					break;	
				case TILE_YELLOW_KEY:
					this.x = nextX;
					this.y = nextY;
					break;
				case TILE_RED_KEY:
					this.x = nextX;
					this.y = nextY;
					break;
				case TILE_BLUE_KEY:
					this.x = nextX;
					this.y = nextY;
					break;
				case TILE_GREEN_KEY:
					this.x = nextX;
					this.y = nextY;
					break;
				case TILE_WALL:
					this.changeDirection();
					break;
				case TILE_SPIKES:
					var i = 1;
					this.x = nextX;
					this.y = nextY;
					this.health = this.health - .5; // Damage to Health
					roomGrid[walkIntoTileIndex] = TILE_SPIKES_BLOODY;
					spikeSound.play();
					break;
				case TILE_SPIKES_BLOODY:
					var i = 1;
					this.x = nextX;
					this.y = nextY;
					break;
			}
		} else {
			this.x = this.x;
			this.y = this.y;
		}
			
	}

	this.isOverlappingPoint = function(testX, testY) {  // textX is redWarrior.x and testY is redWarrior.y
		var deltaX = Math.ceil(Math.abs(testX-this.x));
		
		if (deltaX == 0) {
			deltaX = deltaX +1;
		}
		var deltaY = Math.ceil(Math.abs(testY-this.y));
		if (deltaY == 0) {
			deltaY = deltaY +1;
		}
		var dist = Math.ceil(Math.sqrt( (deltaX*deltaX) + (deltaY*deltaY)));
		
		var testDirection = this.skeletonDirection;
		
		colorRect(testX,testY, 10, 10, "blue"); 
				
		if (dist <= SKELETON_COLLISION_RADIUS) {
				
			if(skeleton.walkNorth || skeleton2.walkNorth) {
				if(redWarrior.y > this.y) {
					this.skeletonBite();
					return (dist <= SKELETON_COLLISION_RADIUS);
				}
			}
			else if(skeleton.walkSouth || skeleton2.walkSouth) {
				if(redWarrior.y < this.y) {
					this.skeletonBite();
					return (dist <= SKELETON_COLLISION_RADIUS);
				}
			}
			else if(skeleton.walkWest || skeleton2.walkWest) {
				if(redWarrior.x < this.x) {
					this.skeletonBite();
					return (dist <= SKELETON_COLLISION_RADIUS);	
				}
			}
			else if(skeleton.walkEast || skeleton2.walkEast) {
				if(redWarrior.x < this.x) {
					this.skeletonBite();
					return (dist <= SKELETON_COLLISION_RADIUS);	
				}
			}
		} // end if Distance within collision radius

	}
		
	this.draw = function() { 

			
		if(this.skeletonMove) {
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
		if(this.health > 0){
			this.sx = this.frameIndex * this.width;
			canvasContext.drawImage(this.mySkeletonPic, this.sx, this.sy, 50, this.height, (this.x - (this.height/2)), (this.y - (this.width/2)), 50, this.height); 
			colorRect((this.x - (this.height/4)),(this.y - (this.width/4)), 5 , 5, "brown")
		} else {

			colorRect(this.x,this.y, 5, 5, "red") 
		}
		
		if (this.health <= 0) {
			this.alive = false;
		}
		
		if (this.alive == true){
			if (this.health < .5) {
				colorRect(this.x-7, this.y-this.height+10, 5 , 10, 'red');
			} if (this.health > 0) {
				colorRect(this.x-10, this.y-this.height+10, 2 , 10, 'green');
			} if (this.health >= .5) {
				colorRect(this.x-10, this.y-this.height+10, 5 , 10, 'green'); // 0.5 HP
			} if (this.health < 1) {
				colorRect(this.x-5, this.y-this.height+10, 5 , 10, 'red');
			} if (this.health >= 1) {
				colorRect(this.x-5, this.y-this.height+10, 5 , 10, 'green'); // 1 HP **********
			} if (this.health < 1.5) {
				colorRect(this.x+5, this.y-this.height+10, 5 , 10, 'red'); 
			} if (this.health >= 1.5) {
				colorRect(this.x+5, this.y-this.height+10, 5 , 10, 'green'); // 1.5 HP	
			} if (this.health < 2 ) {
				colorRect(this.x+10, this.y-this.height+10, 5 , 10, 'red');
			} if (this.health >= 2) {
				colorRect(this.x+10, this.y-this.height+10, 5 , 10, 'green');
			}
		}	
	}
}