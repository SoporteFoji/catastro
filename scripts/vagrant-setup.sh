#!/bin/sh

# Update
apt-get update

# Install nginx
apt-get install -y nginx

# Install python
apt-get install -y python python-pip

# Install virtualenv
pip install virtualenv

# Create virtual environment and install dependencies
su - vagrant <<EOF
cd /vagrant/
virtualenv --python python3 .env/
. .env/bin/activate
pip install -r foji_project/requirements.txt
cd foji_project/
python manage.py makemigrations && python manage.py migrate
EOF
