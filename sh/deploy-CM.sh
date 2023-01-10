# Run this for deploing resources and other

echo "\n---- START deploy CM ----\n"

#Resources
echo "\nResources\n"

./deploy-SharedResourcesMainService.sh

#K8s
echo "\nK8s\n"

./deploy-k3sResourcesService.sh

#CMAuthorization
echo "\nCM - Authorization\n"

./deploy-CMAuthorization.sh

#CM People
echo "\nCM - People\n"

./deploy-CMPeople.sh

#Other

echo "\n---- END deploy CM ----\n"