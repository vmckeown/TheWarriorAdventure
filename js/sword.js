const SWORD_LIFE = 10;
const SWORD_SPEED = 1.0;
var swordAlive = false;


function swordClass() {
	this.sx = 0;
	this.sy = 0;
	this.ang = 01;
	this.xv = 5;
	this.yv = 5;
	this.swordLife = SWORD_LIFE;
	this.mySwordPic = swordPic;

	this.reset = function() {
		this.swordLife = 0;
		swordAlive = false;
	} 
	
	this.move = function() {
		if(this.swordLife > 0) {
			this.swordLife--;
		this.swX = redWarrior.x;
		this.swY = redWarrior.y;	  
		}
	}

	this.isSwordReadyToSwing = function() {
	
        return(this.swordLife <= 0);
    }
	
	this.shootFrom = function(warriorAttack) {
		this.x = warriorAttack.x;
		this.y = warriorAttack.y;
		
		this.swordLife = SWORD_LIFE;
	}
	
	this.hitTest = function(thisEnemy) {
		
		
		if(this.swordLife <= 0) {
			return false;
		} 
		
		if(direction == "north") {// warrior facing North
			
						
			if(	this.x+25 > thisEnemy.x &&    // within left side
				this.x+25 < (thisEnemy.x + thisEnemy.width) && //within right side
				this.y-20 > thisEnemy.y && // within top side
				this.y-20 < (thisEnemy.y + thisEnemy.height)) // within bottom 
					{ //checking top left of sword
									// Check Sword then Enemy; inside leftSide side , inside rightSide, inside bottom, and inside top. 
						document.getElementById("debugText").innerHTML = "Successful hit "+ thisEnemy.myName+"!";
						thisEnemy.health--;
					}
		} else if(direction == "south") {// warrior facing South
			
			if(	this.x + 10 > thisEnemy.x &&    // within left side
				this.x + 10 < (thisEnemy.x + thisEnemy.width) && //within right side
				this.y + 70 > thisEnemy.y && // within top side
				this.y + 70 < (thisEnemy.y + thisEnemy.height)) // within bottom 
					{ //checking top left of sword
									// Check Sword then Enemy; inside leftSide side , inside rightSide, inside bottom, and inside top. 
						document.getElementById("debugText").innerHTML = "Successful hit "+ thisEnemy.myName+"!";
						thisEnemy.health--;
					}			
		} else if(direction == "west") {// warrior facing West
						
			if(	this.x -30 > thisEnemy.x &&    // within left side
				this.x -30 < (thisEnemy.x + thisEnemy.width) && //within right side
				this.y + 25 > thisEnemy.y && // within top side
				this.y + 25 < (thisEnemy.y + thisEnemy.height)) // within bottom 
					{ //checking top left of sword
									// Check Sword then Enemy; inside leftSide side , inside rightSide, inside bottom, and inside top. 
						document.getElementById("debugText").innerHTML = "Successful hit "+ thisEnemy.myName+"!";
						thisEnemy.health--;
					}			
		} else if(direction == "east") {// warrior facing East
						
			if(	this.x + 60 > thisEnemy.x &&    // within left side
				this.x + 60 < (thisEnemy.x + thisEnemy.width) && //within right side
				this.y + 25 > thisEnemy.y && // within top side
				this.y + 25 < (thisEnemy.y + thisEnemy.height)) // within bottom 
					{ //checking top left of sword
									// Check Sword then Enemy; inside leftSide side , inside rightSide, inside bottom, and inside top. 
						document.getElementById("debugText").innerHTML = "Successful hit "+ thisEnemy.myName+"!";
						thisEnemy.health--;
					}			    
 		} else {
			return false;
		}
	}
	
	this.draw = function() {

		var swordWidth = 10;
		var swordLength = 40;
		var swordXLocation = redWarrior.x;
		var swordYLocation = redWarrior.y;
		
		if(direction == "north") {
			swordWidth = 10;
			swordLength = 20;
			swordXLocation = redWarrior.centerX+5;
			swordYLocation = redWarrior.y - swordLength;
		}
		else if(direction == "south") {
			swordWidth = 10;
			swordLength = 40;
			swordXLocation = redWarrior.centerX-10;
			swordYLocation = redWarrior.centerY+10;
		}
		else if(direction == "west") {
			swordWidth = 40;
			swordLength = 10;
			swordXLocation = redWarrior.x - swordWidth + 10;
			swordYLocation = redWarrior.centerY;
		}
		else if(direction == "east") {
			swordWidth = 40;
			swordLength = 10;
			swordXLocation = redWarrior.x + 20;
			swordYLocation = redWarrior.centerY;
		
		} 
		
		if(this.swordLife > 0) {
			swordAlive = false;
			colorRect(swordXLocation, swordYLocation, swordWidth, swordLength, "gray" );
		}
	}
	
}

