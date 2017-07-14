apt-get update
apt-get install -y postgresql build-essential

cd ~
curl -sL https://deb.nodesource.com/setup_7.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh

sudo apt-get -y install nodejs
