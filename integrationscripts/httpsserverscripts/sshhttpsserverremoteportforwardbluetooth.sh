echo Connect your clients to the Server via Bluetooth on Subnet 192.168.44.0/24
echo Then setup an SSHD on 192.168.44.1:8022 and press enter
echo A HTTPS port will be forwarded to your local 8443 port.
read
ssh -D 8888 -R 127.0.0.1:8443:127.0.0.1:443 u0_a177@192.168.44.1 -p 8022 -N
