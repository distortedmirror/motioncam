#!/bin/bash
rm -f ./screens/* 2> /dev/null
perl -e 'print "Content-type: text/html\r\n\r\n";'
echo Cleared
