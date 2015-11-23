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
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com --recv EA312927
echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.2 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
apt-get update
apt-get install -y mongodb-org

service mongod start

# запустим сервис
npm install forever -g

# запускаем приложение
forever start app.js

