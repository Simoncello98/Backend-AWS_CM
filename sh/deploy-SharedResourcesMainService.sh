#!/bin/sh

echo "\nSharedResourcesMainService\n"

cd ../

export $(grep -v '^#' .env | xargs)

ln services/SharedResourcesMainService/serverless-SharedResourcesMainService.yml serverless.yml
sls deploy
unlink serverless.yml

if ([ $# -eq 1 ] && [ $1 != "-c" ] && [ $1 == "-c" ]) || ([ $# -eq 2 ] && [ $2 == "-c" ]); then
    echo "closing..."
else
    read -rsp $'Press enter to continue...\n'
fi