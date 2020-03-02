var video = document.getElementById('video');
var canvas = document.getElementById('motion');
var score = document.getElementById('score');
var videoImage=document.getElementById('videoImage');
var videoImageTimestamp=document.getElementById('videoImageTimestamp');
var videoImageX=document.getElementById('videoImageX');
var rangeCap=document.getElementById('rangeCapture');
var divCapture = document.getElementById('divCapture');
var numThreshold= document.getElementById('numberThreshold');
var capCount=0;

function initSuccess() {
	DiffCamEngine.start();
}

function initError() {
	debugger;
	alert('Something went wrong.');
}
function thumbnail(base64, maxWidth, maxHeight) {

  // Max size for thumbnail
  if(typeof(maxWidth) === 'undefined') var maxWidth = 500;
  if(typeof(maxHeight) === 'undefined') var maxHeight = 500;

  // Create and initialize two canvas
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var canvasCopy = document.createElement("canvas");
  var copyContext = canvasCopy.getContext("2d");

  // Create original image
  var img = new Image();
  img.src = base64;

  // Determine new ratio based on max size
  var ratio = 1;
  if(img.width > maxWidth)
    ratio = maxWidth / img.width;
  else if(img.height > maxHeight)
    ratio = maxHeight / img.height;

  // Draw original image in second canvas
  canvasCopy.width = img.width;
  canvasCopy.height = img.height;
  copyContext.drawImage(img, 0, 0);

  // Copy and resize second canvas to first canvas
  canvas.width = img.width * ratio;
  canvas.height = img.height * ratio;
  ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL();

}
function capture(payload) {

	var sc = payload.score;
	score.textContent = payload.score;
	if(sc>=numThreshold.value){
	        var img = document.createElement("img");
       		img.src =thumbnail( payload.getURL(),86,72);
		function formatAMPM(date) { // This is to display 12 hour format like you asked
		  var hours = date.getHours();
		  var minutes = date.getMinutes();
		  var ampm = hours >= 12 ? 'pm' : 'am';
		  hours = hours % 12;
		  hours = hours ? hours : 12; // the hour '0' should be '12'
		  minutes = minutes < 10 ? '0'+minutes : minutes;
		  var secs=date.getSeconds();
		  var strTime = hours + ':' + minutes + ':'+(secs<10?'0':'')+secs+' '+ ampm;
		  return strTime;
		}
		var myDate = new Date(Date.now());
		var displayDate = myDate.getMonth()+ '/' +myDate.getDate()+ '/' +myDate.getFullYear()+ ' ' +formatAMPM(myDate);
		videoImageTimestamp.innerHTML=displayDate;
		img.setAttribute('title',displayDate);
		img.setAttribute('style','position:relative;height:45%;width:auto;margin:1px;');
		rangeCap.setAttribute('oninput','videoImageX.style.display="block";videoImageTimestamp.style.display="block";videoImage.src=divCapture.children[this.value].src;videoImageTimestamp.innerHTML=divCapture.children[this.value].getAttribute("title");videoImage.setAttribute("style","display:block;position:fixed;top:0px;height:80%;z-index:100;border:4px gold outset;");videoImage.setAttribute("onclick","videoImageX.style.display=\\\"none\\\";videoImageTimestamp.style.display=\\\"none\\\";this.style.display=\\\"none\\\";");');
		img.setAttribute('onclick','videoImageX.style.display="block";videoImageTimestamp.style.display="block";videoImage.src=this.src;videoImageTimestamp.innerHTML=this.getAttribute("title");videoImage.setAttribute("style","display:block;position:fixed;top:0px;height:80%;z-index:100;border:4px gold outset;");videoImage.setAttribute("onclick","videoImageX.style.display=\\\"none\\\";videoImageTimestamp.style.display=\\\"none\\\";this.style.display=\\\"none\\\";");');
		if(divCapture.childNodes.length==0){	
			divCapture.append(img);
		}else{
			divCapture.insertBefore(img,divCapture.childNodes[0]);
		}
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
	captureCallback: 