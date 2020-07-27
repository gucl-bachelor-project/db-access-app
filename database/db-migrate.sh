#!/usr/bin/env bash
docker build -t bproject-db-migrator -f Dockerfile-db-migrator .
docker run --env-file .env bproject-db-migrator
