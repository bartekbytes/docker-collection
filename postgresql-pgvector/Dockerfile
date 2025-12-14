FROM postgres:18

# Install build deps
# build-essential: for make and gcc
# git: to clone the pgvector repo
# postgresql-server-dev-18: to build pgvector against the installed Postgres version
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    postgresql-server-dev-18


# clone and install pgvector
RUN git clone https://github.com/pgvector/pgvector.git \
    && cd pgvector \
    && make \
    && make install

# Cleanup build deps
RUN apt-get remove -y build-essential git postgresql-server-dev-18 \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*