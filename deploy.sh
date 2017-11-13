#!/bin/bash -ue

die() {
    echo $1
    exit 1
}

### Install
export PATH="/tmp/Bluemix_CLI/bin:$PATH"

./install-bx.sh
hash bx || die "bx not found"
hash kubectl || die "kubectl not found"

### Login
bx login \
  -a "${BLUEMIX_TARGET_URL}" \
  -c "${BLUEMIX_ACCOUNT}" \
  -o "${BLUEMIX_ORG}" \
  -s "${BLUEMIX_SPACE}" \
  --apikey "${BLUEMIX_API_KEY}" || die "Failed to authenticate to Bluemix"

# Init container clusters
bx cs init || die "Failed to initialize to Bluemix Container Service"
exp=$(bx cs cluster-config $CLUSTER_NAME | grep export) || die "Cluster $CLUSTER_NAME not created or not ready."
eval "$exp"

### Deploy
npm run build
npm run push

### Run
kubectl apply -f kubernetes.yml
