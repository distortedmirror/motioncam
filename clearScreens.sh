#!/bin/bash
((flock --timeout 60 8 || exit 1 ) &&  (
cd /var/www/html/ 2> /dev/null
mv ./screens/* ./screensarchive/ 2> /dev/null
mv ./screens.html screens-`date | sed 's/[ :]/-/g'`.html 2> /dev/null
perl -e 'print "Content-type: text/html\r\n";'
#perl -e 'print "Content-Length: 0\r\n\r\n";'
 ) ) 8> /var/lock/lock8
