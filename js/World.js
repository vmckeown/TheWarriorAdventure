const TILE_W = 50;
const TILE_H = 50;
const ROOM_COLS = 32; 
const ROOM_ROWS = 24; 

var camPanX = 0.0;
var camPanY = 0.0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 150;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 100;


var levelOne =   [04,04,04,04,04,32,18,32,32,18,18,32,32,32,32,32,18,18,20,04,04,04,04,04,04,32,04,04,04,04,04,04,
				  04,00,05,10,04,18,32,18,18,32,32,18,18,32,32,18,32,18,20,04,22,31,00,24,04,18,04,11,00,00,00,04,
				  04,00,00,00,04,18,18,18,18,18,18,18,18,18,18,18,18,32,20,04,27,30,28,29,04,18,04,00,00,00,00,04,
				  04,10,00,00,04,32,18,32,04,04,04,04,04,04,04,04,04,18,20,04,00,00,00,00,04,18,04,00,00,00,00,04,
				  04,04,04,14,04,18,18,18,04,02,02,02,19,02,02,02,04,18,20,04,04,00,04,04,04,18,04,04,04,14,04,04,
				  32,18,08,00,18,18,18,18,04,12,00,00,00,00,00,02,04,18,20,18,18,00,18,18,18,18,18,18,18,00,18,32,
				  32,32,00,18,18,18,18,18,04,02,00,00,00,00,00,02,04,18,20,18,18,00,18,18,18,18,18,18,18,00,32,18,
				  32,18,21,18,18,18,18,18,04,02,00,00,00,00,00,02,04,18,20,00,00,00,00,00,00,00,00,00,00,00,18,32,
				  18,32,00,18,18,18,18,18,04,02,00,00,00,00,00,02,04,18,20,00,18,18,18,18,00,18,18,18,18,18,32,18,
				  32,18,00,18,18,18,18,18,04,04,04,04,16,04,04,04,04,18,20,00,18,18,18,18,00,18,18,18,18,18,18,32,
				  18,32,00,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,20,00,18,32,18,18,00,18,18,18,18,18,18,32,
				  32,18,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,18,04,04,04,16,04,04,04,04,18,18,32,
				  18,32,00,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,20,18,18,04,00,00,00,00,00,00,04,18,32,18,
				  32,18,00,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,20,18,18,04,00,00,00,00,00,00,04,18,18,32,
				  32,32,21,18,18,18,32,18,18,18,18,18,18,00,18,18,32,18,20,18,18,04,00,00,00,00,00,00,04,18,18,32,
				  32,18,00,18,18,18,20,20,20,18,18,18,18,00,18,18,18,18,20,18,18,04,00,00,00,00,00,00,04,18,18,32,
				  32,32,00,18,18,20,20,20,18,18,18,04,04,17,04,04,04,04,20,18,18,04,00,00,00,00,00,00,04,18,32,18,
				  32,18,00,18,18,20,18,32,18,18,18,04,00,00,00,00,00,04,20,18,18,04,13,00,00,00,00,00,04,18,32,18,
				  04,04,15,04,04,20,18,18,18,18,18,04,00,00,00,00,00,04,20,18,18,04,04,04,04,04,04,04,04,18,18,32,
				  04,00,00,00,04,20,18,18,18,18,18,04,00,00,00,00,00,04,20,18,18,18,18,18,18,18,18,18,18,18,18,32,
				  04,00,00,00,04,20,18,18,18,18,18,04,00,00,00,00,00,04,20,18,18,18,32,18,18,18,18,18,18,18,18,32,
				  04,00,00,00,04,20,18,18,18,18,18,04,00,00,00,00,00,04,20,18,18,18,18,18,18,18,18,18,18,18,18,32,
				  04,08,10,12,04,20,18,18,18,18,18,04,00,00,00,00,00,04,20,18,18,18,18,18,18,32,18,18,18,18,18,32,
				  04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,07,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04];

var levelTwo =  [04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,
				 32,18,18,18,18,18,18,18,18,18,18,04,10,00,00,00,05,04,20,18,18,18,18,18,18,04,00,19,00,00,12,04,
				 04,04,04,04,04,18,18,18,18,18,18,04,00,00,00,00,00,04,20,18,18,18,18,18,18,04,00,00,00,00,00,04,
				 04,00,31,00,04,18,18,18,18,18,18,04,10,00,00,00,00,04,20,18,18,18,18,18,18,04,00,00,00,00,00,04,
				 04,27,30,29,04,18,18,18,18,18,18,04,04,14,04,04,04,04,20,18,18,18,18,18,18,04,00,00,00,00,00,04,
				 04,00,00,00,04,18,18,18,18,18,18,18,18,00,18,18,18,18,20,18,18,18,18,18,18,04,00,00,00,00,00,04,
				 04,00,00,00,00,00,00,18,18,18,18,18,18,00,18,18,18,18,20,18,18,18,18,18,04,04,04,04,04,16,04,04,
				 04,04,04,04,04,18,00,18,18,18,18,18,18,00,00,00,00,00,00,00,00,18,18,18,04,00,00,00,00,00,12,04,
				 32,18,18,18,18,18,00,18,18,18,18,18,18,00,18,18,18,18,20,18,00,18,18,18,04,00,00,00,00,00,00,04,
				 32,18,18,18,18,18,00,18,18,32,18,18,18,00,18,32,18,18,20,18,00,00,00,00,14,00,00,00,00,00,08,04,
				 32,18,18,18,18,18,00,18,18,18,18,18,18,00,18,18,32,18,20,18,00,18,18,18,04,00,00,00,00,00,00,04,
				 32,18,18,18,18,18,00,18,18,18,18,18,18,00,18,32,18,18,20,18,00,18,18,18,04,00,21,00,00,00,00,04,
				 04,04,04,04,04,18,00,18,18,18,18,18,18,00,18,18,32,18,20,20,00,20,18,18,04,04,04,04,04,16,04,04,
				 04,21,00,00,04,18,00,18,18,18,18,18,18,00,18,32,18,18,18,18,00,20,18,18,18,18,18,04,00,00,00,04,
				 07,00,00,00,17,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,20,18,18,18,18,18,04,00,00,00,04,
				 04,00,00,00,04,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,20,18,18,18,18,18,04,00,00,00,04,
				 04,00,00,00,04,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,20,18,18,18,18,18,04,00,00,00,04,
				 04,00,00,00,04,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,20,18,18,18,18,18,04,00,00,00,04,
				 04,04,04,04,04,18,18,18,18,18,18,18,04,04,04,04,16,04,04,18,18,20,18,18,18,18,18,04,00,00,00,04,
				 32,18,18,18,18,18,18,18,18,18,18,18,04,00,00,00,00,00,04,18,18,20,18,18,18,18,18,04,00,00,12,04,
				 32,18,18,18,18,18,18,18,18,18,18,18,04,00,00,00,00,00,04,18,18,20,18,18,18,18,18,04,04,04,04,04,
				 32,32,18,18,18,18,18,18,18,18,18,18,04,00,00,00,00,00,04,18,18,20,18,18,18,18,18,18,18,18,18,32,
				 32,18,32,18,18,18,18,18,18,18,18,18,04,13,00,08,00,10,04,18,18,20,18,18,18,18,18,18,18,18,18,32,
				 32,32,32,32,32,32,32,32,32,32,32,32,04,04,04,04,04,04,04,32,32,32,32,32,32,32,32,32,32,32,32,32];
				
var levelThree =
				[04,04,07,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,
				 04,00,00,00,00,04,12,00,00,00,08,04,18,18,18,18,18,18,18,18,04,10,00,00,10,04,18,04,31,00,00,04,
				 04,00,00,00,00,17,08,00,00,00,00,04,18,18,18,18,18,18,18,18,04,00,00,00,00,04,18,04,30,26,00,04,
				 04,00,00,00,00,04,00,00,00,00,00,16,00,00,00,00,00,00,00,00,14,00,00,00,00,04,18,04,00,28,28,04,
				 04,00,21,00,00,04,00,00,00,00,00,04,18,18,18,18,18,18,00,18,04,21,00,00,12,04,18,04,00,00,00,04,
				 04,04,04,04,04,04,00,00,00,00,00,04,18,18,18,18,18,18,00,18,04,04,04,04,04,04,18,04,00,04,04,04,
				 04,00,00,00,00,04,00,00,00,00,00,04,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,00,18,32,18,
				 04,00,00,00,00,04,16,04,04,04,04,04,18,18,18,18,18,18,00,18,18,18,18,18,18,18,00,00,00,32,18,32,
				 04,00,00,00,00,00,00,04,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,00,18,18,18,32,18,
				 04,13,00,00,00,00,00,04,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,00,18,18,32,18,18,
				 04,04,04,04,04,04,04,04,18,18,32,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,00,18,32,18,18,18,
				 32,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,00,18,18,32,18,32,
				 32,18,18,18,18,18,32,18,18,18,18,18,18,18,18,20,18,18,00,18,18,18,18,18,18,18,00,18,04,04,04,04,
				 32,18,18,18,18,18,18,18,18,18,18,18,18,18,20,20,18,18,00,18,18,18,18,18,18,18,00,18,04,10,00,04,
				 32,18,18,18,18,18,18,18,18,18,18,18,18,18,20,20,20,18,00,18,18,18,18,18,18,18,00,18,04,00,05,04,
				 20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,18,00,00,00,00,00,00,00,00,00,00,14,00,00,04,
				 32,18,18,18,18,18,18,18,18,18,18,18,18,18,20,20,18,18,18,18,18,18,18,18,18,18,18,18,04,00,00,04,
				 32,18,18,18,18,18,18,18,18,18,18,18,18,18,20,20,18,18,18,18,18,18,18,18,18,18,18,18,04,10,00,04,
				 32,18,18,18,18,18,18,18,18,18,18,18,18,18,20,20,18,18,32,18,18,18,18,18,18,18,18,18,04,04,04,04,
				 04,04,04,04,18,18,32,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,18,18,18,18,18,18,18,32,
				 04,00,00,04,18,18,18,18,18,18,18,18,18,18,18,18,32,18,18,18,32,18,18,18,18,18,18,18,18,18,32,18,
				 04,00,00,14,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,18,18,32,18,18,
				 04,19,00,04,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,18,18,32,
				 04,04,04,04,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,18,18,18,18];
				  
var levelFour =	[04,04,07,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,
				 04,00,00,00,04,00,31,00,04,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,04,19,04,
				 04,00,00,00,04,27,30,29,04,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,04,14,04,
				 04,00,00,00,04,00,00,00,04,18,18,18,18,18,18,18,04,04,04,04,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,04,17,04,04,04,00,04,04,18,18,18,18,18,18,18,04,21,13,04,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,00,18,18,18,18,18,18,18,18,18,04,00,00,04,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,00,00,00,00,18,18,18,18,18,18,18,18,18,04,00,00,04,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,16,04,04,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,04,04,04,04,04,04,04,04,04,04,04,04,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,04,00,00,00,00,10,00,00,08,04,00,08,04,
				 04,18,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,16,00,00,00,00,00,00,00,00,14,00,00,04,
				 04,18,00,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,04,00,00,00,00,00,00,00,00,04,00,00,04,
				 04,18,00,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,04,00,00,00,00,00,00,00,00,04,00,00,04,
				 04,18,00,18,18,18,04,04,14,04,04,18,18,18,18,18,18,18,18,04,04,04,14,04,04,14,04,04,04,00,00,04,
				 04,18,10,18,18,18,04,00,21,00,04,18,18,18,18,18,18,18,18,04,00,00,00,00,04,00,00,00,04,00,00,04,
				 04,18,00,18,18,18,04,00,00,00,04,18,18,18,18,18,18,18,18,04,00,00,00,00,04,00,00,00,04,00,00,04,
				 04,18,05,18,18,18,04,00,12,00,04,18,18,18,18,18,18,18,18,04,10,00,00,10,04,10,00,10,04,00,12,04,
				 04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04];
  
var levelList = [levelOne, levelTwo, levelThree, levelFour];
var levelNow = 0;
var roomGrid = [];

const TILE_ROAD = 00;
const TILE_KEY = 01;
const TILE_SPIKES = 02;
const TILE_SPIKES_BLOODY = 03;
const TILE_WALL = 04;
const TILE_PLAYERSTART = 05;
const TILE_DOOR = 06;
const TILE_FINISH = 07;
const TILE_SKELETON = 08;
const TILE_BAT = 09;
const TILE_YELLOW_KEY = 10;
const TILE_GREEN_KEY = 11;
const TILE_BLUE_KEY = 12;
const TILE_RED_KEY = 13;
const TILE_YELLOW_DOOR = 14;
const TILE_GREEN_DOOR = 15;
const TILE_BLUE_DOOR = 16;
const TILE_RED_DOOR = 17;
const TILE_GRASS = 18;
const TILE_TREASURE = 19;
const TILE_WATER = 20;
const TILE_ZOMBIE = 21;
const TILE_SHOP_1 = 22;
const TILE_SHOP_2 = 23;
const TILE_SHOP_3 = 24;
const TILE_SHOP_4 = 25;
const TILE_SHOP_6 = 26;
const TILE_SHOP_7 = 27;
const TILE_SHOP_8 = 28;
const TILE_SHOP_9 = 29;
const TILE_SHOP_A = 30;
const TILE_SHOPKEEPER = 31;
const TILE_TREE = 32;

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
			checkTileType == TILE_GREEN_KEY ||
			checkTileType == TILE_YELLOW_KEY ||
			checkTileType == TILE_BLUE_KEY ||
			checkTileType == TILE_RED_KEY ||
			checkTileType == TILE_YELLOW_DOOR ||
			checkTileType == TILE_GREEN_DOOR ||
			checkTileType == TILE_BLUE_DOOR ||
			checkTileType == TILE_RED_DOOR ||
			checkTileType == TILE_TREASURE ||
			checkTileType == TILE_SHOP_1 || 
			checkTileType == TILE_SHOP_2 || 
			checkTileType == TILE_SHOP_3 || 
			checkTileType == TILE_SHOP_4 || 
			checkTileType == TILE_SHOP_6 || 
			checkTileType == TILE_SHOP_7 ||
			checkTileType == TILE_SHOP_8 ||
			checkTileType == TILE_SHOP_9 ||
			checkTileType == TILE_SHOP_A ||
			checkTileType == TILE_SHOPKEEPER
			);
}

function drawRoom() {

	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	
	for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
		for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			var tileKindHere = roomGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];

			if( tileTypeHasTransparency(tileKindHere) ) {
				canvasContext.drawImage(worldPics[TILE_ROAD], drawTileX, drawTileY);
			}
			canvasContext.drawImage(useImg, drawTileX, drawTileY);
			drawTileX += TILE_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += TILE_H;
		drawTileX = 0;
	} // end of for each row
}
	
function drawOnlyTilesOnScreen() {
	var cameraLeftMostCol = Math.floor(camPanX / TILE_W);
	var cameraTopMostRow = Math.floor(camPanY / TILE_H);
	var colsThatFitOnScreen = Math.floor(canvas.width / TILE_W);
	var rowsThatFitOnScreen = Math.floor(canvas.height / TILE_W);
	var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 2;
	var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;
	
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
		
	for(var eachCol = cameraLeftMostCol; eachCol < cameraRightMostCol; eachCol++) {
		for(var eachRow = cameraTopMostRow; eachRow < cameraBottomMostRow; eachRow++) {
				
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			var tileKindHere = roomGrid[arrayIndex];				
			var useImg = worldPics[tileKindHere];
			
			if( tileTypeHasTransparency(tileKindHere) ) {
				canvasContext.drawImage(worldPics[TILE_ROAD], drawTileX, drawTileY);
			}
			
			if (drawTileX <= 32) {
			canvasContext.drawImage(useImg, drawTileX, drawTileY);
			drawTileX += TILE_W;
			arrayIndex++;
			}
		}
	}
}
	
function resetLevel() {
	loadLevel(levelList[levelNow])
}