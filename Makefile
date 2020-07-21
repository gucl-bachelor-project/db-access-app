setup:
	docker volume create nodemodules_db_administration
	docker volume create nodemodules_db_admin_administration
	# Create Docker networks if it does not exist
	docker inspect logging-network > /dev/null 2>&1 || docker network create logging-network

install:
	docker-compose -f ./db-administration-app/docker-compose.builder.yml run --rm install
	docker-compose -f ./db-admin-administration-app/docker-compose.builder.yml run --rm install

dev:
	$(MAKE) setup
	$(MAKE) install
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --force-recreate

migrate-db-local:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml run --service-ports --use-aliases -d --rm mysql-db
	docker build -t db-migrator -f ./database/Dockerfile-db-migrator ./database
	docker run --network=internal-network -e "APP_DB_NAME=app_db_1" -e "WAIT_HOSTS=mysql-db:33060" db-migrator
	docker run --network=internal-network -e "APP_DB_NAME=app_db_2" -e "WAIT_HOSTS=mysql-db:33060" db-migrator
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

prod-build:
	docker build -t 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-db-administration-app:latest -f ./dockerfiles/Dockerfile-node-app-prod ./db-administration-app
	docker build -t 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-db-admin-administration-app:latest -f ./dockerfiles/Dockerfile-node-app-prod ./db-admin-administration-app

prod-push:
	echo $$(aws ecr get-login-password) | docker login --password-stdin --username AWS 468374654130.dkr.ecr.eu-central-1.amazonaws.com
	s3cmd put docker-compose.yml s3://bproject-bucket/app-docker-compose-files/persistence/docker-compose.yml
	s3cmd put docker-compose.prod.yml s3://bproject-bucket/app-docker-compose-files/persistence/docker-compose.prod.yml
	docker push 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-db-administration-app
	docker push 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-db-admin-administration-app
