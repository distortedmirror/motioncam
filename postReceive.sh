export dt=`date +%D_%T|sed -e 's/[\/: ]/_/g'`
ncat -l $1 > ./screens/${dt}_$2.temp <<EOF
HTTP/1.0 OK
Access-Control-Allow-Origin: *

EOF
cat ./screens/${dt}_$2.temp |perl -e '$ok=0;while(<>){if(/^<html><head>$/){$ok=1;}if($ok==1){print;};}' > ./screens/${dt}_$2 
rm -f ./screens/${dt}_$2.temp 2> /dev/null
cp -f ./screens/${dt}_$2 $2
echo '<html><head></head><body>' > screens.html
for i in `ls ./screens/*.html|sort`; do echo "<a href=\"$i\">`echo $i|perl -pe 's/\.\/screens\/(..)_(..)_(..)_(..)_(..)_(..)_screen.html/$1\/$2\/20$3 $4:$5:$6/g;'`</a>";done >>screens.html
echo '</body></html>' >> screens.html
for i in `find screens/ -size 0`; do rm -f $i 2> /dev/null; done
