# Project setup
1. run npm i

# Configure AWS cli trough serverless
1. login with your aws account trough serverless: > serverless config credentials --provider provider --key <key> --secret <secret> 

# How to deploy
1. go to BACKEND AWS_CM/sh
2. launch ./deploy-CM.sh
3. Go to AWS console, go to iam/users and select the k3s user
4. go to credentials/create access key 
4. get access key id and secret and put them in the k3s local config (see k8s backend readme for more info).

