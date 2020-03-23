#/bin/bash
export INC=/usr/share/perl5
#cd ..
while true;
do
  ncat --sh-exec "./response.sh" -p 8080 -l --keep-open -m 100
done 
