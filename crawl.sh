#!/bin/bash

cd `dirname $0`

eval "$(cat .env <(echo) <(declare -x))"

mkdir -p log  # if not exists
mkdir -p log/projects
mkdir -p log/profile

starttime=`date +"%Y/%m/%d %T"`
filename=$(date +'%Y%m%d_%H%M%S')

wget -T 40 -t 3 --keep-session-cookies --save-cookies=cookies.txt -E https://www.sheepit-renderfarm.com/user/signin -O log/login.html

wget -T 40 -t 3 --keep-session-cookies --load-cookies=cookies.txt --save-cookies=cookies2.txt -E --post-data="login=${LOGIN}&password=${PASSWORD}&timezone=Asia/Tokyo" https://www.sheepit-renderfarm.com/user/authenticate -O log/authenticate.html

wget -T 40 -t 3 --load-cookies=cookies2.txt -E https://www.sheepit-renderfarm.com/home/projects -O log/projects.html
mv log/projects.html "log/projects/projects_${filename}.html"

wget -T 40 -t 3 --load-cookies=cookies2.txt -E https://www.sheepit-renderfarm.com/user/kira96c/profile -O log/profile.html
mv log/profile.html "log/profile/profile_${filename}.html"

/home/chino/.nodenv/shims/node index.mjs
/home/chino/.nodenv/shims/node aggregate.mjs
