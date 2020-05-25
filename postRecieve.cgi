#!/bin/bash
export dt=`date +%D_%T|sed -e 's/[\/: ]/_/g'`
ncat -l $1 > ./screens/${dt}_$2.temp <<EOF
HTTP/1.0 OK
Access-Control-Allow-Origin: *

EOF
if [ ! -e ./screens/${dt}_$2.temp ]; then exit 1; fi
cat ./screens/${dt}_$2.temp |perl -e '$ok=0;while(<>){if(/^<html><head>$/){$ok=1;}if($ok==1){print;};}' > ./screens/${dt}_$2.pre 
rm -f ./screens/${dt}_$2.temp 2> /dev/null
echo '<select id="selectScreen" onchange="var v=this.options[this.selectedIndex].value;if(v!=&quot;&quot;){document.location=&quot;/screens/&quot;+v;}" multiple style="position: fixed;z-index: 1000;left: 1%;top: 13%;bottom: 35%;width: 18%;">' > screens.html
for i in `ls ./screens/*.html 2> /dev/null |sort`; do 
export DATETIME=`echo $i|perl -pe 's/\.\/screens\/(..)_(..)_(..)_(..)_(..)_(..)_screen.html/$1\/$2\/20$3 $4:$5:$6/g;'`
export TIME=`echo $i|perl -pe 's/\.\/screens\/(..)_(..)_(..)_(..)_(..)_(..)_screen.html/$4:$5:$6/g;'`
echo "<option value=\"`echo $i|perl -pe 's/..screens//ig;'`\" title=\"$DATETIME\">$DATETIME</option>" >>screens.html
done 
echo '</select>' >> screens.html
for i in `find screens/ -size 0`; do rm -f $i 2> /dev/null; done
if [ ! -e ./screens/${dt}_$2.pre ]; then exit 1; fi
export SELECTHTML="`cat screens.html | perl -pe 's/[\r\n]//ig;s/\///ig;'`"
cat ./screens/${dt}_$2.pre | perl -pe 's/<div id="divSelect"><\/div>/$ENV{'\''SELECTHTML'\''}/ig;' > ./screens/${dt}_$2
cp -f ./screens/${dt}_$2 screen.html
rm -f ./screens/${dt}_$2.pre 2> /dev/null
