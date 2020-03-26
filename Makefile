setup:
	docker volume create nodemodules_db_access
	docker volume create nodemodules_db_access_admin

install:
	docker-compose -f ./db-access/docker-compose.builder.yml run --rm install
	docker-compose -f ./db-access-admin/docker-compose.builder.yml run --rm install

dev:
	$(MAKE) setup
	$(MAKE) install
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --force-recreate

migrate-db-local:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml run --service-ports --use-aliases -d --rm mysql-db
	docker build -t db-migrator -f ./database/Dockerfile-db-migrator ./database
	docker run --network=db-access-app-network -e "APP_DB_NAME=app_db_1" -e "WAIT_HOSTS=mysql-db:33060" db-migrator
	docker run --network=db-access-app-network -e "APP_DB_NAME=app_db_2" -e "WAIT_HOSTS=mysql-db:33060" db-migrator
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

prod-build:
	docker build -t 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-db-access-app:latest -f ./dockerfiles/Dockerfile-node-app-prod ./db-access
	docker build -t 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-db-access-admin-app:latest -f ./dockerfiles/Dockerfile-node-app-prod ./db-access-admin

prod-push:
	$$(aws2 ecr get-login --no-include-email --region eu-central-1)
	aws2 s3 cp docker-compose.yml s3://gkc-bproject-app-docker-composes/db-access/docker-compose.yml
	aws2 s3 cp docker-compose.prod.yml s3://gkc-bproject-app-docker-composes/db-access/docker-compose.prod.yml
	docker push 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-db-access-app
	docker push 468374654130.dkr.ecr.eu-central-1.amazonaws.com/bproject-db-access-admin-app
