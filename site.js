var video = document.getElementById('video');
var canvas = document.getElementById('motion');
var score = document.getElementById('score');

function initSuccess() {
	DiffCamEngine.start();
}

function initError() {
	alert('Something went wrong.');
}

function capture(payload) {
	var divCapture = document.getElementById('divCapture');
	var sc = payload.score;
	score.textContent = payload.score;
	if(sc>=30){
        var img = document.createElement("img");
        img.src = payload.getURL();
	img.setAttribute('style','position:relative;height:100%;width:auto;');
        divCapture.append(img);
	}
}

DiffCamEngine.init({
	video: video,
	motionCanvas: canvas,
	initSuccessCallback: initSuccess,
	initErrorCallback: initError,
	captureCallback: capture
});
