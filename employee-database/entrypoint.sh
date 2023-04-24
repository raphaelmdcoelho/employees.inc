#!/bin/bash
set -e

# Start SQL Server
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to start
sleep 120s

# Run the SQL scripts
for script in /sql-scripts/*.sql
do
  /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "${SA_PASSWORD}" -d master -i "${script}"
done

# Wait for the SQL Server process
wait
