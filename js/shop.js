function drawShop(){
	canvasContext.drawImage(storeFrontPic, 0,0);  // replace with inventory background
	colorText("Please let me know if you would like any of our" , 25, 50, "white");
	colorText("items in stock." , 25, 65, "white");
	colorText("1.) 10 Arrows 	- 	10 gp", 50, 100, "white");
	colorText("2.)  1 Heart 	- 	 5 gp", 50, 120, "white");
	colorText("3.) 'Nothing at this time'", 50, 140, "white");
}

function shopInput(whichKeyCode){
	var shopKeeperFeedback = null;
	
	switch(whichKeyCode){
		
		case NUM_1: 
			if(redWarrior.goldpieces >= 10){
				redWarrior.goldpieces = redWarrior.goldpieces - 10;
				redWarrior.myArrow.arrowQuantity = redWarrior.myArrow.arrowQuantity + 10;
				shopKeeperFeedback = "Shop Keeper:  Thank you for purchasing the arrows.  Please come again.";
			} else {
				shopKeeperFeedback = "Shop Keeper:  You don't have enough gold pieces";
			}
				break;
		case NUM_2:
			if(redWarrior.goldpieces >= 10){
				redWarrior.goldpieces = redWarrior.goldpieces - 10;
				redWarrior.health++;
				shopKeeperFeedback = "Shop Keeper:  Thank you for purchase the heart.  Please come again.";
			} else {
				shopKeeperFeedback = "Shop Keeper:  You don't have enough gold pieces";
			}
			break;
		case NUM_3:
			shopKeeperFeedback = "Shop Keeper:  Please come again.  We will have more inventory in the future.";
			break;
		default:
			shopKeeperFeedback = "Shop Keeper:  Please come again.";
			break;
	} 
	isInShop = false;
	redWarrior.updateReadout();
	document.getElementById("debugText").innerHTML = shopKeeperFeedback;				
}