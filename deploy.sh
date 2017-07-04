#!/usr/bin/env sh
set -ex

curl -sL "https://public.dhe.ibm.com/cloud/bluemix/cli/bluemix-cli/Bluemix_CLI_0.5.4_amd64.tar.gz" | tar -zx
sudo bash Bluemix_CLI/install_bluemix_cli
rm -rf Bluemix_CLI
bx config --check-version=false
bx plugin install IBM-containers -r Bluemix

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