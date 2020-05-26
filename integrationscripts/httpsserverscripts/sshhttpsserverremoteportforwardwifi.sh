echo Connect your clients to the Gateway Server .1 via this script. 
route |grep -v Kernel
ip addr | grep inet
route |grep inet
uname=u0_a169
ip=192.168.44.1
socksport=8888
remotesocksport=8888
port=8022
fromport=443
toport=8443
echo Scan
nping -c 1 127.0.0.1 -tcp -p $fromport
nping -c 1 $ip
nping -c 1 $ip -tcp -p $port
echo "ssh -D 127.0.0.1:$socksport -R 127.0.0.1:$toport:127.0.0.1:$fromport $uname\@$ip -p $port "
echo Connecting to SSHD on $uname$ip:$port
ssh -D 127.0.0.1:$socksport -R 127.0.0.1:$toport:127.0.0.1:$fromport $uname\@$ip -p $port 
