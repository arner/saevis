#!/bin/bash -e
# utlity script to set the API url at run time (allows us to have the same build on different environments)
# -- Do not run from host machine --

DIR="/usr/share/nginx/html"
TARGET1="$DIR/main.bundle.js"
TARGET2="$DIR/main.bundle.js.map"

# check for input
if [ -z $SERVER_URL ];  then
    echo "SERVER_URL environment variable needs to be set."
    exit 1
fi

echo "Setting API url to ${SERVER_URL}"
sed -i "s/apiUrl: .*'/apiUrl: '$SERVER_URL'/g" $TARGET1
sed -i "s/apiUrl: .*'/apiUrl: '$SERVER_URL'/g" $TARGET2
