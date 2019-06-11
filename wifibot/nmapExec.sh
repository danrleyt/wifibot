#!/bin/bash
password="cat pass"
echo ${password}
RESULT="$(echo -e ${password} | sudo -S nmap -sn $1-$2 | grep MAC)"
echo "${RESULT}"
