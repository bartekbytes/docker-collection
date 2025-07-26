# Intro

This `docker-compose.yml` file defines a basic setup for running a local **MySQL** server using **Docker Compose**.

It creates two services:

- **mysql_db** - A MySQL Database Server.
- **adminer** - A [web-based UI](https://www.adminer.org/en/) for administering and querying various RDBMS, compared to using the command-line `mysql` tool.

# Configuration details

## General

- for both services, the **latest** images are pulled:
  - _MySQL_ official docker image [docs](https://hub.docker.com/_/mysql)
  - _Adminer_ official docker image [docs](https://hub.docker.com/_/adminer/)
- for both services, `container_name` is used instead of default names.

## `mysql_db` Service

- Exposes the default MySQL port `3306`.
- Defines one required environment variable:
  - `MYSQL_ROOT_PASSWORD` - sets the password for the `root` user. (For a full list of environment variables, see the official MySQL
    [Docker image documentation](https://hub.docker.com/_/mysql), under _Environment Variables_ section)
- Uses a Docker-managed volume named `mysql_db_data` (not a local host directory)

## `adminer` Service

- Exposes port `8080` to access the Web UI.

## MySQL Login & Environment Variables Details

- MySQL administrator user name is `root`
- Password for this user is set using Environment Variable `MYSQL_ROOT_PASSWORD`
- When Environment Variable `MYSQL_DATABASE` is provided in docker-dompose, then a database with that name will be created. If a user/password is also provided
  (see below), then this user will be granted a superuser access to this database.
- If Environment Variable `MYSQL_USER` is provided in docker-compose file, then a new user with a provided name is created. Additionally
  if Environment Variable `MYSQL_PASSWORD` is provided, then it will set up a password for that user.

# Adminer Login & Connecting to MySQL

## Connecting to the MySQL Server via Adminer

In your browser navigate to _localhost:8080_, then in order to login to MySQL, please provide:

- server: **mysql_db** (this is the service name from `docker-compose` file)
- username: **root** (or value from `MYSQL_USER` in your Compose file, if you provided)
- password: (value from `MYSQL_ROOT_PASSWORD` in your Compose file)
- database: (value from `MYSQL_DATABASE` in your Compose file, if you provided)

![PostgreSQL pgAdmin  - how to login](media/mysql-connect-via-adminer.png)
