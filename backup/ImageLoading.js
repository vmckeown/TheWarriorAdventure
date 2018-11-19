var warriorPicNorth = document.createElement("img");
var warriorPicWest = document.createElement("img");
var warriorPicSouth = document.createElement("img");
var warriorPicEast = document.createElement("img");
var batPic = document.createElement("img");
var batPic1 = document.createElement("img");
var worldPics = [];

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
		picsToLoad--;
		console.log(picsToLoad);
		if(picsToLoad == 0) {
			imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
}

function loadImageForWorldCode(worldCode, fileName)  {
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], fileName);	
}

function loadImages() {
	
		var imageList = [
			{tileType: TILE_ROAD,  theFile: "worldRoad.png"},
			{tileType: TILE_KEY,  theFile: "world_key.png"},
			{tileType: TILE_WALL, theFile: "wallEast.png"},
			{tileType: TILE_DOOR, theFile: "world_door.png"},
			{tileType: TILE_FINISH, theFile: "world_goal.png"},
			{tileType: TILE_SPIKES, theFile: "spikes.png"},
			{tileType: TILE_SPIKES_BLOODY, theFile: "spikesBloody.png"},
			{varName: warriorPicNorth, theFile: "warriorNorth.png"},
			{varName: warriorPicWest, theFile: "warriorWest.png"},
			{varName: warriorPicSouth, theFile: "warriorSouth.png"},
			{varName: warriorPicEast, theFile: "warriorEast.png"},
			{varName: batPic, theFile: "bat.png"},
			{varName: batPic1, theFile: "bat1.png"},
		];
			
	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForWorldCode( imageList[i].tileType, imageList[i].theFile );
		}
	}
}