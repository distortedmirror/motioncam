var video = document.getElementById('video');
var canvas = document.getElementById('motion');
var score = document.getElementById('score');
var videoImage=document.getElementById('videoImage');
var rangeCap=document.getElementById('rangeCapture');
var divCapture = document.getElementById('divCapture');
var numThreshold= document.getElementById('numberThreshold');
var capCount=0;

function initSuccess() {
	DiffCamEngine.start();
}

function initError() {
	alert('Something went wrong.');
}

function capture(payload) {

	var sc = payload.score;
	score.textContent = payload.score;
	if(sc>=numThreshold.value){
	        var img = document.createElement("img");
       		img.src = payload.getURL();
		img.setAttribute('style','margin:2px;position:relative;height:45%;width:auto;');
		rangeCap.setAttribute('onchange','videoImage.src=divCapture.getElementsByTagId("img")[this.value].src;videoImage.style.display="block";setTimeout(function(){videoImage.style.display="none";},3000);');
		img.setAttribute('onclick','videoImage.src=this.src;videoImage.style.display="block";setTimeout(function(){videoImage.style.display="none";},3000);');
		divCapture.append(img);
		capCount++;
		rangeCap.setAttribute('max',capCount);
		rangeCap.setAttribute('value',capCount);
	}
}

DiffCamEngine.init({
	video: video,
	motionCanvas: canvas,
	initSuccessCallback: initSuccess,
	initErrorCallback: initError,
	captureCallback: capture
});
