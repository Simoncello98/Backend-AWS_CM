# Project setup
1. run npm i

# Configure AWS cli trough serverless
1. login with your aws account trough serverless: > serverless config credentials --provider provider --key <key> --secret <secret> 

# How to deploy
1. go to BACKEND AWS_CM/sh
2. launch ./deploy-CM.sh
3. Go to AWS console, DynamoDB
4. Open table Authorizaton
5. Put in this table all the objects defined in "BACKEND AWS_CM/DynamoAuthorizations/<filename>" (or use an import tool).
6. Go to AWS console, go to iam/users and select the k3s user
7. go to credentials/create access key 
8. get access key id and secret and put them in the k3s local config (see k8s backend readme for more info).

