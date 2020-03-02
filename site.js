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
function resize_image( src, dst, type, quality ) {
     var tmp = new Image(),
         canvas, context, cW, cH;

     type = type || 'image/jpeg';
     quality = quality || 0.92;

     cW = src.naturalWidth;
     cH = src.naturalHeight;

     tmp.src = src.src;
     tmp.onload = function() {

        canvas = document.createElement( 'canvas' );

        cW /= 8;
        cH /= 8;

        if ( cW < src.width ) cW = src.width;
        if ( cH < src.height ) cH = src.height;

        canvas.width = cW;
        canvas.height = cH;
        context = canvas.getContext( '2d' );
        context.drawImage( tmp, 0, 0, cW, cH );

        dst.src = canvas.toDataURL( type, quality );

        if ( cW <= src.width || cH <= src.height )
           return;

        tmp.src = dst.src;
     }

  }
function capture(payload) {

	var sc = payload.score;
	score.textContent = payload.score;
	if(sc>=numThreshold.value){
	        var img = document.createElement("img");
       		var img2 = document.createElement("img");
        img2.src=payload.getURL();
        resize_image(img2,img);
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
	captureCallback: capture
});
