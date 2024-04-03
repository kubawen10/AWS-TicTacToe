#!/bin/bash

# Configure logfile
LOG_FILE=/logfile.log
exec > >(tee -a ${LOG_FILE} )
exec 2>&1

# Install Docker
sudo apt update -y
sudo apt install -y docker.io
sudo service docker start
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo mkdir -p /usr/local/lib/docker/cli-plugins
sudo curl -sL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m) -o /usr/local/lib/docker/cli-plugins/docker-compose
sudo chown root:root /usr/local/lib/docker/cli-plugins/docker-compose
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Clone the GitHub repository
git clone https://github.com/kubawen10/AWS-TicTacToe.git

# Change directory to the cloned repository
cd ./AWS-TicTacToe

# Retrieve the public IP address of the EC2 instance
PUBLIC_IP=$(curl https://checkip.amazonaws.com)
# Replace the placeholder in the frontend code with the actual public IP address
sed -i "s/{{PUBLIC_IP}}/$PUBLIC_IP/g" ./frontend/src/api_connection.js

# idk why i cant use docker compose without this two builds
cd ./frontend
docker build -t myfrontend:v1 -t myfrontend:latest .
cd ../backend
docker build -t mybackend:v1 -t mybackend:latest .

sudo docker compose up -d