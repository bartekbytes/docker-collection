# Create Debezium CDC connector to PostgreSQL

```json
{
  "name": "postgres-cdc",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname": "postgres",
    "database.port": "5432",
    "database.user": "postgres",
    "database.password": "postgres",
    "database.dbname": "postgres",
    "topic.prefix": "postgres.cdc",
    "slot.name": "debezium",
    "plugin.name": "pgoutput",
    "table.include.list": "public.customers"
  }
}
```

POST http://localhost:8083/connectors
Headers:
Content-Type: application/json
payload raw , like above

to Check status:

GET http://localhost:8083/connectors/postgres-cdc/status
