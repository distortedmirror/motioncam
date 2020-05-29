#!/bin/bash
cd /usr/lib/cgi-bin
perl -e 'print "Content-type: text/html\r\n";'
perl -e 'print "Content-Length: '`cat screen.html |wc -c`'\r\n\r\n";'
cat screen.html
