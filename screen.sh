#!/bin/bash
((flock --timeout 60 8 || exit 1 ) &&  (
cd /var/www/html 2> /dev/null
perl -e 'print "Content-type: text/html\r\n";'
perl -e 'print "Content-Length: '`cat screen.html |wc -c`'\r\n\r\n";'
cat screen.html
 ) ) 8> /var/lock/lock8
