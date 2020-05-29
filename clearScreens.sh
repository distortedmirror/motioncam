#!/bin/bash
cd /usr/lib/cgi-bin/ 2> /dev/null
rm -f ./screens/* 2> /dev/null
rm -f ./screens.html 2> /dev/null
perl -e 'print "Content-type: text/html\r\n";'
#perl -e 'print "Content-Length: 0\r\n\r\n";'
