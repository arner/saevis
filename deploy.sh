#!/usr/bin/env bash


installDependencies() {
    if ! hash bx; then
        curl -sL "https://public.dhe.ibm.com/cloud/bluemix/cli/bluemix-cli/Bluemix_CLI_0.5.4_amd64.tar.gz" | tar -zx
        mv Bluemix_CLI/bin/bluemix bx
        chmod +x bx
        export PATH=$PATH:$(pwd)
    fi

    bx ic version || bx plugin install IBM-containers -r Bluemix
}

build() {
    cd saevis
    ng build --env=prod
    docker build --tag saevis
}

installDependencies
