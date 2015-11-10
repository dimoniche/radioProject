#!/bin/bash

apt-get update

#ставим nodejs
apt-get install curl
curl -sL https://deb.nodesource.com/setup | sudo bash -
apt-get install nodejs
apt-get install build-essential

# ставим git
apt-get install libcurl4-gnutls-dev libexpat1-dev gettext libz-dev libssl-dev
apt-get install git

# ставим проект
git clone https://github.com/dimoniche/radioProject.git

npm install node-gyp -g
npm cache clean
rm -rf node_modules
npm install

# базу ставим
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | tee/etc/apt/sources.list.d/mongodb-org-3.0.list
apt-get install -y mongodb-org

service mongod start

