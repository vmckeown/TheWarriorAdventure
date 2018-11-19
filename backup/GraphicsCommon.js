function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}

function colorRect(topLeftX,topRightY, boxWidth,boxHeight, fillColor) {  //draw rectangles
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topRightY, boxWidth, boxHeight,);
}

function colorCircle(centerX,centerY, radius, fillColor) {  //draw circles
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}

/*function loaded() {
    imageReady = true;
    setTimeout( update, 1000 / 60 );
}

var frame = 0;

function update() {
    redraw();
    frame++;
    if (frame >= 6) frame = 0;
    setTimeout( update, 1000 / 60 );
}

function redraw();
 if (imageReady)
        canvasContext.drawImage(img, frame*96, 0, 96, 54,
                      canvas.width/2 - 48, canvas.height/2 - 48, 96, 54);
}
*/