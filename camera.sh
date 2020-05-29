#!/bin/bash
cd /usr/lib/cgi-bin 2> /dev/null
perl -e 'print "Content-type: text/html\r\n";'
perl -e 'print "Content-Length: '`cat index.html|base64|wc -c`'\r\n\r\n";'
cat index.html
