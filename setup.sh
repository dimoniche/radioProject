#!/bin/bash

apt-get update

# Установим nodejs
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup | sudo bash -
apt-get install -y nodejs
apt-get install -y build-essential

# Установим зависимости
npm install node-gyp -g
npm cache clean
rm -rf node_modules
npm install

# установим базу
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
apt-get update
apt-get install -y mongodb-org

service mongod start

# запустим сервис
npm install forever -g
npm install forever-monitor


# запускаем приложение
forever start app.js


