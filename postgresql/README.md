# Intro

This **docker-compose.yml** file is a basic Docker Compose file that
creates 2 services:

- **postgresql_db** -> this is a PostgreSQL Database Server
- **pgadmin** -> this is a Web Application that is a Web UI for PostgreSQL Database, that allows do an admin or development tasks in a nicer Web UI approach (nicer in a way than just a command-line application psql)

# Configuration details

## General

- for both services, the **latest** image is pulled
- for both services, `container_name` is used instead of default names

## Service `postgresql_db`

- Default port `5432` is forwarded
- Only one required `Environment Variable` (**environment** section in yaml) is defined: `POSTGRES_PASSWORD` (for more Environment Variables, please visit a section: **How to extend this image/Environment Variables** in [Docker Image Documentation](https://hub.docker.com/_/postgres))
- Volume used is a Docker Volume with a name `postgresql_db_data`, not a local computer one

## Service `pgadmin`

- Default port `8888` is open for access the Web UI
- 2 required `Environment Variables` are defined:
  - `PGADMIN_DEFAULT_EMAIL` -> This is the PGAdmin Email, that is used to login to Web UI on login page
  - `PGADMIN_DEFAULT_PASSWORD` -> This is the PGAdmin Password, that is used to login to Web UI on login page
  - Volume used is a Docker Volume with a name `pgadmin_data`, not a local computer one

# Login to PostgreSQL

- Because **Environment Variable** `POSTGRES_USER` is not set up in the docker compose file,
  then the default user name is: **postgres**
- Because **Environment Variable** `POSTGRES_DB` is not set up in the docker compose file,
  then the default DD Name is the same as PostgreSQL **Environment Variable** `POSTGRES_USER`,
  and because this is also not set up, then database name defaults to **postgres**

## Login pgAdmin Web UI

How to login to PostgreSQL via pgAdmin

![PostgreSQL pgAdmin  - how to login](media/postgresql-pgadmin-login.png)

## How to connect to PostgreSQL server

![PostgreSQL pgAdmin - connect to server](media/postgres-pgadmin-connect-to-server.png)
