const TILE_W = 50;
const TILE_H = 50;
const ROOM_COLS = 16;
const ROOM_ROWS = 12;


var levelOne =  [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
				 4,0,0,0,0,4,0,0,0,0,0,0,4,0,0,7,
			  	 4,0,0,0,0,0,0,0,0,0,0,0,6,0,0,4,
				 4,1,0,0,0,4,0,0,0,0,0,0,4,0,0,4,
				 4,4,4,4,4,4,4,4,4,6,4,4,4,4,4,4,
				 4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,4,
				 4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,4,
				 4,0,0,0,0,6,0,0,0,0,0,0,0,0,0,4,
				 4,0,0,0,2,4,0,0,0,0,0,0,0,0,0,4,
				 4,0,0,0,1,4,0,0,0,0,0,0,0,0,0,4,
				 4,5,0,0,2,4,0,0,0,0,0,0,0,0,1,4,	
				 4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];	

var levelTwo = [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
				4,5,0,0,0,2,0,0,0,0,0,0,0,0,0,4,
				4,0,4,4,4,4,4,4,4,6,4,4,4,4,6,4,
				4,0,4,0,0,0,0,0,0,0,4,0,0,0,1,4,
				4,1,4,1,0,0,0,0,0,0,4,1,0,0,0,4,
				4,6,4,4,4,4,6,4,4,4,4,4,4,4,4,4,
				4,0,0,4,1,0,0,0,0,0,4,0,0,0,0,7,
				4,0,4,4,4,4,4,0,4,0,4,0,0,0,0,4,
				4,0,6,0,0,0,6,0,4,0,4,0,0,0,0,4,
				4,0,4,4,4,4,4,0,4,0,4,4,4,4,6,4,
				4,0,6,1,0,0,6,0,4,0,6,0,0,0,0,4,	
				4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
				
var levelThree = [4,4,4,4,4,4,4,4,4,4,4,4,4,4,7,4,
				  4,0,0,6,0,6,0,0,0,6,0,0,6,0,0,4,
				  4,0,0,4,1,4,0,0,0,4,1,0,4,0,0,4,
				  4,0,4,4,4,4,4,4,6,4,4,4,4,0,0,4,
				  4,6,4,0,0,0,0,0,0,0,0,0,4,0,0,4,
				  4,0,4,4,4,6,4,4,4,4,4,4,4,0,0,4,
				  4,5,0,6,0,0,0,0,0,0,0,1,4,4,4,4,
				  4,0,4,4,4,4,4,4,4,4,4,4,4,1,0,4,
				  4,1,4,1,0,0,1,4,4,4,1,1,4,0,0,4,
				  4,6,4,4,4,6,4,4,4,4,4,6,4,4,6,4,
				  4,0,1,1,6,0,0,0,6,0,1,0,6,0,1,4,	
				  4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
				  
var levelFour =   [4,7,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
				  4,0,2,0,2,0,2,0,2,0,2,0,2,6,0,4,
			      4,6,4,4,4,4,4,4,4,4,4,4,4,4,2,4,
				  4,0,4,1,2,2,2,6,2,4,0,4,0,6,0,4,
				  4,0,4,0,4,4,4,4,0,4,0,6,1,4,0,4,
				  4,0,4,0,6,0,0,6,0,4,0,4,0,4,0,4,
				  4,0,4,0,4,4,4,4,1,4,0,4,0,4,0,4,
				  4,0,4,0,0,0,0,4,0,6,0,4,0,4,0,4,
				  4,0,4,0,4,0,2,4,4,4,4,4,0,4,0,4,
				  4,0,4,0,4,0,2,0,4,1,1,4,0,4,1,4,
				  4,0,6,0,4,1,2,2,4,0,0,6,0,4,5,4,
				  4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
  
var levelList = [levelOne, levelTwo, levelThree, levelFour];
var levelNow = 0;
var roomGrid = [];

const TILE_ROAD = 0;
const TILE_KEY = 1;
const TILE_SPIKES = 2;
const TILE_SPIKES_BLOODY = 3;
const TILE_WALL = 4;
const TILE_PLAYERSTART = 5;
const TILE_DOOR = 6;
const TILE_FINISH = 7;
const TILE_START = 8;
const TILE_BAT = 9;

function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < ROOM_COLS &&
		row >= 0 && row < ROOM_ROWS) {
		 var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		 return roomGrid[worldIndexUnderCoord];
	} else {
		return TILE_WALL;
	}
}

function getTileTypeAtPixelCoord(atX, atY) {
	var warriorWorldCol = Math.floor(atX / TILE_W);
	var warriorWorldRow = Math.floor(atY / TILE_H);
	var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

	if(warriorWorldCol >= 0 && warriorWorldCol < ROOM_COLS &&
		warriorWorldRow >= 0 && warriorWorldRow < ROOM_ROWS) {
		return worldIndexUnderWarrior;
	} // end of valid col and row

	return undefined;
} // end of warriorWorldHandling func

function rowColToArrayIndex(col, row) {
	return col + ROOM_COLS * row;
}

function tileTypeHasTransparency(checkTileType) {
	return (checkTileType == TILE_FINISH ||
			checkTileType == TILE_KEY ||
			checkTileType == TILE_DOOR);
}

function drawRoom() {

	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for(var eachRow=0;eachRow<ROOM_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<ROOM_COLS;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			var tileKindHere = roomGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];

			if( tileTypeHasTransparency(tileKindHere) ) {
				canvasContext.drawImage(worldPics[TILE_ROAD],drawTileX,drawTileY);
			}
			canvasContext.drawImage(useImg,drawTileX,drawTileY);
			drawTileX += TILE_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += TILE_H;
		drawTileX = 0;
	} // end of for each row

} // end of drawWorld func

function resetLevel() {
	loadLevel(levelList[levelNow])
}