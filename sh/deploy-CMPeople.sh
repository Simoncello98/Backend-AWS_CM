cd CMPeople

echo "\n---- START deploy CM - People ----\n"

#User Service
echo "\nUser Services\n"

echo "\n[1 - 11]\n"
./deploy-UserService.sh -c

#Visitor Service
echo "\nVisitor Services\n"

echo "\n[2 - 11]\n"
./deploy-VisitorService.sh -c

#Company Service
echo "\nCompany Services\n"

echo "\n[3 - 11]\n"
./deploy-CompanyService.sh -c

#Campus Service
echo "\nCampus Services\n"

echo "\n[4 - 11]\n"
./deploy-CampusService.sh -c
echo "\n[5 - 11]\n"
./deploy-CampusXCompanyService.sh -c
echo "\n[6 - 11]\n"
./deploy-CampusXCompanyXUserService.sh -c

echo "\n---- END deploy CM - People ----\n"