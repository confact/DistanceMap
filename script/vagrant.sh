#!/bin/bash

sudo locale-gen en_US.UTF-8
export LC_ALL=en_US.UTF-8
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y nginx redis-server python-software-properties git openjdk-7-jdk

sudo apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 0xcbcb082a1bb943db
sudo add-apt-repository 'deb http://ftp.ddg.lth.se/mariadb/repo/10.0/debian wheezy main'
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/debian "$(lsb_release -sc)"/mongodb-org/3.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
wget -qO - https://packages.elasticsearch.org/GPG-KEY-elasticsearch | sudo apt-key add -
echo "deb http://packages.elasticsearch.org/elasticsearch/1.4/debian stable main" | sudo tee /etc/apt/sources.list.d/elasticsearch.list
sudo apt-get update

sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password j4gl3v3rbr4!!'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password j4gl3v3rbr4!!'
sudo apt-get install -y mongodb-org mariadb-server elasticsearch libmariadbclient-dev imagemagick
sudo service elasticsearch start

#rvm
su - vagrant -c 'gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3'
su - vagrant -c 'curl -sSL https://get.rvm.io | bash -s stable'
su - vagrant -c 'rvm install 2.1.4'
su - vagrant -c 'rvm use 2.1.4 --default'