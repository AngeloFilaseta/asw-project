docker-compose build
docker volume create --name=pdf
docker volume create --name=mongodb_data
docker-compose up $1
