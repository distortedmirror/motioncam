ncat -l $1 > $2.temp <<EOF
HTTP/1.0 OK
Access-Control-Allow-Origin: *

EOF
cat $2.temp |perl -e '$ok=0;while(<>){if(/^<html><head>$/){$ok=1;}if($ok==1){print;};}' > $2 
rm -f $2.temp 2> /dev/null
