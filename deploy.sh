#!/usr/bin/env sh
set -ex

bx update
bx login -a "${BLUEMIX_API_URL}" -o "${BLUEMIX_ORGANIZATION}" -s "${BLUEMIX_SPACE}"
bx ic init

docker build saevis --tag ${REGISTRY}/${CLIENT}
docker build server --tag ${REGISTRY}/${SERVER}

docker push ${REGISTRY}/${CLIENT}
docker push ${REGISTRY}/${SERVER}

bx ic group-remove ${SERVER} || true
bx ic group-remove ${CLIENT} || true

sleep 30

bx ic group-create -domain ${DOMAIN} --name ${CLIENT} -hostname ${CLIENT} -p 80 -e SERVER_URL="https:\/\/${SERVER}.${DOMAIN}" ${REGISTRY}/${CLIENT}
bx ic group-create -domain ${DOMAIN} --name ${SERVER} -hostname ${SERVER} -p 3000 ${REGISTRY}/${SERVER}