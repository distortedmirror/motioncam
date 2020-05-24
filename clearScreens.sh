#!/bin/bash
export dt=`date +%D_%T|sed -e 's/[\/: ]/_/g'`
ncat -l $1 > ./screens/${dt}.temp <<EOF
HTTP/1.0 OK
Access-Control-Allow-Origin: *

EOF
rm -f ./screens/* 2> /dev/null
