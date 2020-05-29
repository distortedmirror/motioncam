#!/bin/bash
((flock --timeout 60 8 || exit 1 ) &&  (
     if [ "1" = "1" ]; then	   
	 cd /usr/lib/cgi-bin
	 set -o pipefail  # trace ERR through pipes
	 set -o errtrace  # trace ERR through 'time command' and other functions
	 function error() {
	     JOB="$0"	      # job name
	     LASTLINE="$1"	      # line of error occurrence
	     LASTERR="$2"	      # error code
	     echo "ERROR in ${JOB} : line ${LASTLINE} with exit code ${LASTERR}" >> error.log
	     exit 1
	 }
	 trap 'error ${LINENO} ${?}' ERR
	 #Timestamp
	 export dt=`date +%D_%T|sed -e 's/[\/: ]/_/g'`
	 #Response Header
	 perl -e 'print "Content-type: text/html\r\n";'
	 perl -e 'print "Access-Control-Allow-Origin: *\r\n";'
	 #Clear and Read HTTP POST
	 rm -f  ./screens/${dt}_screen.html.temp 2> /dev/null
	 rm -f  ./screens/${dt}_screen.html.decode 2> /dev/null
	 while read line; do
	     echo $line >>  ./screens/${dt}_screen.html.decode 2> /dev/null
	 done
	 echo $line >>  ./screens/${dt}_screen.html.decode 2> /dev/null
	 #Exit on Blank Post
	 if [ ! -e ./screens/${dt}_screen.html.decode ]; then exit 1; fi
	 cat ./screens/${dt}_screen.html.decode |base64 -d > ./screens/${dt}_screen.html.temp
	 rm -f  ./screens/${dt}_screen.html.decode 2> /dev/null
	 #Remove HTTP Header
	 cat ./screens/${dt}_screen.html.temp |perl -e '$ok=0;while(<>){if(/^<html><head>$/){$ok=1;}if($ok==1){print;};}' > ./screens/${dt}_screen.html 
	 rm -f ./screens/${dt}_screen.html.temp 2> /dev/null
	 #Exit if Posted Screen is Blank, or it Fails
	 if [ ! -e ./screens/${dt}_screen.html ]; then exit 1; fi
	 #Remove Blank or Failed Screens
	 #Possibly Remove Bad Screens Later on.
	 for i in `find ./screens/* -size 0`; do rm -f $i 2> /dev/null; done
	 #Create HTML SELECT of All Generated Screens
	 echo '<select id="selectScreen" onchange="var screenURI=this.options[this.selectedIndex].value;if(screenURI!=&quot;&quot;){document.location='/screens/'+screenURI;}" size="13" style="position: fixed;z-index: 1000;left: 1%;top: 13%;bottom: 35%;width: 18%;">' > screens.html
	 #List all loaded Screens Sorted
	 for i in `ls ./screens/*.html 2> /dev/null |sort`; do
	     #Create underscore delimited Date and Time Labels
	     export DATETIME=`echo $i|perl -pe 's/\.\/screens\/(..)_(..)_(..)_(..)_(..)_(..)_screen\.html/$1_$2_$3_$4_$5_$6/ig;'`
	     export DATETIMELABEL=`echo $i|perl -pe 's/\.\/screens\/(..)_(..)_(..)_(..)_(..)_(..)_screen\.html/$1\/$2\/$3 $4:$5:$6/ig;'`
	     #Create the SELECT OPTIONS for each Screen
	     echo '<option value="'${DATETIME}'_screen.html?clear=false&viewonly=true&rand='`date +%s`'" title="'$DATETIMELABEL'">'$DATETIMELABEL'</option>' >>screens.html
	 done
	 echo '</select>' >> screens.html
	 #End Creating HTML SELECT of All Generated Screens
	 #Turn the SELECT into a flat string with no enters or newlines for easy replacement in main HTML file.
	 export SELECTHTML="`cat screens.html | perl -pe 's/[\r\n]//ig;'`"
	 #Send the length and content to the client
	 perl -e 'print "Content-Length: '`echo $SELECTHTML|base64|wc -c`'\r\n\r\n";'
	 echo $SELECTHTML|base64
	 #Replace SELECT HTML into main HTML file that is timestamped
	 cp ./screens/${dt}_screen.html ./screens/${dt}_screen.html.temp 2> /dev/null
	 cat ./screens/${dt}_screen.html.temp | perl -pe 's/<div id="divSelect"><\/div>/<div id="divSelect">$ENV{'\''SELECTHTML'\''}<\/div>/ig;' > ./screens/${dt}_screen.html
	 #Copy the previous timestamped HTML to a main screen HTML
	 rm -f ./screen.html 2> /dev/null
	 rm -f ./screens/${dt}_screen.html.temp 2> /dev/null
	 cp -f ./screens/${dt}_screen.html ./screen.html
	 #Remove the pre-replaced HTML File
	 #Remove SELECT HTML
#	 rm -f ./screens.html 2> /dev/null	
chmod a+rw screens.html 2> /dev/null
chmod a+rw screen.html 2> /dev/null
     fi
 ) ) 8> /var/lock/lock8
