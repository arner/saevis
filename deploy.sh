#!/usr/bin/env bash -ex

bx login
bx ic init

docker build saevis --tag ${REGISTRY}/${CLIENT}
docker build server --tag ${REGISTRY}/${SERVER}

docker push ${REGISTRY}/${CLIENT}
docker push ${REGISTRY}/${SERVER}

bx ic group-remove ${SERVER}
bx ic group-remove ${CLIENT}

sleep 30

bx ic group-create -domain ${DOMAIN} --name ${CLIENT} -hostname ${CLIENT} -p 80 -e SERVER_URL=${SERVER}.${DOMAIN}:3000 ${REGISTRY}/${CLIENT}
bx ic group-create -domain ${DOMAIN} --name ${SERVER} -hostname ${SERVER} -p 3000 ${REGISTRY}/${SERVER}