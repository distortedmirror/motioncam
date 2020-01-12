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
		function formatAMPM(date) { // This is to display 12 hour format like you asked
		  var hours = date.getHours();
		  var minutes = date.getMinutes();
		  var ampm = hours >= 12 ? 'pm' : 'am';
		  hours = hours % 12;
		  hours = hours ? hours : 12; // the hour '0' should be '12'
		  minutes = minutes < 10 ? '0'+minutes : minutes;
		  var strTime = hours + ':' + minutes + ' ' + ampm;
		  return strTime;
		}
		var myDate = Date.now();
		var displayDate = myDate.getMonth()+ '/' +myDate.getDate()+ '/' +myDate.getFullYear()+ ' ' +formatAMPM(myDate);
		img.setAttribute('alt',displayDate);
		img.setAttribute('style','margin:2px;position:relative;height:45%;width:auto;');
		rangeCap.setAttribute('onchange','videoImage.src=divCapture.children[this.value].src;videoImage.style.display="block";setTimeout(function(){videoImage.style.display="none";},3000);');
		img.setAttribute('onclick','videoImage.src=this.src;videoImage.style.display="block";setTimeout(function(){videoImage.style.display="none";},3000);');
		divCapture.append(img);
		capCount++;
		document.getElementById('divCount').innerHTML=capCount;
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
