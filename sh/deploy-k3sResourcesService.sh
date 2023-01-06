#!/bin/sh

echo "\nk3sResourcesService\n"

cd ../

export $(grep -v '^#' .env | xargs)

ln services/k3sResourcesService/serverless-k3sResourcesService.yml serverless.yml
sls deploy
unlink serverless.yml

if ([ $# -eq 1 ] && [ $1 != "-c" ] && [ $1 == "-c" ]) || ([ $# -eq 2 ] && [ $2 == "-c" ]); then
    echo "closing..."
else
    read -rsp $'Press enter to continue...\n'
fi