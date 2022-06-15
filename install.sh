#!/bin/bash

printf "Installing client dependencies...\n"
clientFolder="./app/frontend"
cacheFolderFront="/tmp/frontend-cache"
rm -rf $cacheFolderFront
npm_config_loglevel=silent npm i --prefix ${clientFolder} --cache $cacheFolderFront


printf "Installing server dependencies...\n"
serverFolder="./app/backend"
cacheFolderBack="/tmp/backend-cache"
rm -rf $cacheFolderBack
npm_config_loglevel=silent npm i --prefix ${serverFolder} --cache $cacheFolderBack
