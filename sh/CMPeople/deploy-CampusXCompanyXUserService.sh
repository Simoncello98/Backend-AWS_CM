#!/bin/sh

echo "\nCampusXCompanyXUserService\n"
cd ../../

export $(grep -v '^#' .env | xargs)

ln services/People/CampusXCompanyXUserService/serverless-CampusXCompanyXUserService.yml serverless.yml

if [ $# -eq 1 ] && [ $1 != "-c" ] ; then
    sls deploy -f $1
else
    sls deploy
fi

unlink serverless.yml
if ([ $# -eq 1 ] && [ $1 != "-c" ] && [ $1 == "-c" ]) || ([ $# -eq 2 ] && [ $2 == "-c" ]); then
    echo "closing..."
else
    read -rsp $'Press enter to continue...\n'
fi