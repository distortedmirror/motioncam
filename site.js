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
		var myDate = new Date(Date.now());
		var displayDate = myDate.getMonth()+ '/' +myDate.getDate()+ '/' +myDate.getFullYear()+ ' ' +formatAMPM(myDate);
		img.setAttribute('title',displayDate);
		img.setAttribute('style','margin:2px;position:relative;height:45%;width:auto;');
		rangeCap.setAttribute('oninput','videoImage.src=divCapture.children[this.value].src;videoImage.setAttribute("style","display:block;position:fixed;top:0px;height:80%;z-index:100;border:4px gold groove;");videoImage.setAttribute("onclick","this.style.display=\"none\";");');
		img.setAttribute('onclick','videoImage.src=this.src;videoImage.setAttribute("style","display:block;position:fixed;top:0px;height:80%;z-index:100;border:4px gold groove;");videoImage.setAttribute("onclick","this.style.display=\"none\";");');
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
