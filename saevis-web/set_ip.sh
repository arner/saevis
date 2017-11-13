#!/bin/bash -e
# utlity script to set the API url at run time (allows us to have the same build on different environments)
# -- Do not run from host machine --

DIR="/usr/share/nginx/html"

# check for input
if [ -z "${SERVER_URL}" ];  then
    echo "SERVER_URL environment variable needs to be set."
    exit 1
fi

for target in main.bundle.js main.bundle.js.map; do
  sed -i "s/apiUrl: .*'/apiUrl: '${SERVER_URL}'/g" "${DIR}/${target}"
done

echo "Set API url to ${SERVER_URL}."
