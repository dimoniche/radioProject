#!/bin/bash

apt-get update

#ставим nodejs
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup | sudo bash -
apt-get install -y nodejs
apt-get install -y build-essential

# ставим git
apt-get install -y libcurl4-gnutls-dev libexpat1-dev gettext libz-dev libssl-dev
apt-get install -y git

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

