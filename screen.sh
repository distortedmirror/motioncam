#!/bin/bash
cd /usr/lib/cgi-bin
perl -e 'print "Content-type: text/html\r\n\r\n";'
cat screen.html
