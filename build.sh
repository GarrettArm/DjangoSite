# For running on a fresh ubuntu install on AWS

!# /bin/sh
echo Building GarrettArm/DjangoSite
sudo apt update
sudo apt upgrade -y
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce -y
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# get secret_keys.env into home/ubuntu/DjangoSite/

sudo apt install git-core -y
git clone --recursive https://github.com/GarrettArm/DjangoSite
cd DjangoSite
sudo usermod -aG docker ${USER}

# [[[ REBOOT ]]]

docker-compose up -d --build
docker-compose run webapp python3 manage.py makemigrations contact polls etextbook milage ajax_polls shwagswap --settings=site_core.settings.production
docker-compose run webapp python3 manage.py migrate --settings=site_core.settings.production
docker-compose run webapp python3 manage.py createsuperuser --settings=site_core.settings.production
docker-compose run webapp python3 manage.py collectstatic --settings=site_core.settings.production
