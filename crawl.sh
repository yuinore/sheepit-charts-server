#!/bin/bash

cd `dirname $0`

eval "$(cat .env <(echo) <(declare -x))"

mkdir -p tmp  # if not exists
mkdir -p log/projects
mkdir -p log/profile
mkdir -p log/profile2

starttime=`date +"%Y/%m/%d %T"`
filename=$(date +'%Y%m%d_%H%M%S')

wget -T 40 -t 3 --keep-session-cookies --save-cookies=tmp/cookies.txt -E https://www.sheepit-renderfarm.com/user/signin -O tmp/login.html

wget -T 40 -t 3 --keep-session-cookies --load-cookies=tmp/cookies.txt --save-cookies=tmp/cookies2.txt -E --post-data="login=${LOGIN}&password=${PASSWORD}&timezone=Asia/Tokyo" https://www.sheepit-renderfarm.com/user/authenticate -O tmp/authenticate.html

wget -T 40 -t 3 --load-cookies=tmp/cookies2.txt -E https://www.sheepit-renderfarm.com/home/projects -O log/projects.html
mv log/projects.html "log/projects/projects_${filename}.html"

wget -T 40 -t 3 --load-cookies=tmp/cookies2.txt -E https://www.sheepit-renderfarm.com/user/kira96c/profile -O log/profile.html
mv log/profile.html "log/profile/profile_${filename}.html"

wget -T 40 -t 3 --load-cookies=tmp/cookies2.txt -E https://www.sheepit-renderfarm.com/user/ikgirncfw/profile -O log/profile2.html
mv log/profile2.html "log/profile2/profile2_${filename}.html"

${NODE_PATH} tools/parse.mjs
${NODE_PATH} tools/aggregate.mjs
