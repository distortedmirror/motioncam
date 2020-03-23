#/bin/bash
export DISPLAY=:0
 urldecode() { : "${*//+/ }"; echo -e "${_//%/\\x}"; }
read input
export input
export uri="`perl -e '$_=$ENV{\"input\"};@get=split(/ /);$_=$get[1];@urlqs=split(/[\?]/);$url=$urlqs[0];print $url;'`"
perl -e 'print "HTTP/1.1 200 OK\r\n"'
if [ "$uri" = "/" ];
then
	export uri=/index.html
fi
export mime="`file --mime-type .$uri`"
export len="`cat .$uri|wc -c`"
perl -e '$_=$ENV{"mime"};@x=split(/ /);$len=$ENV{"len"};print "Content-Type: $x[1]\r\nContent-Length: $len\r\n\r\n"'
perl -e '$_=$ENV{"mime"};@x=split(/ /);$len=$ENV{"len"};print "Content-Type: $x[1]\r\nContent-Length: $len\r\n\r\n"' > logout.out
cat .$uri
