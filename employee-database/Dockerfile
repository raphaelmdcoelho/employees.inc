# Use the official Microsoft SQL Server 2019 image
FROM mcr.microsoft.com/mssql/server:2019-latest

# Set environment variables
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=SqlServer2023*
ENV MSSQL_PID=Developer

# Switch to the root user to create the /sql-scripts directory
USER root

# Create the /sql-scripts directory in the container
RUN mkdir -p /sql-scripts

# Copy the SQL scripts to the /sql-scripts directory
COPY ./sql-scripts /sql-scripts

# Grant permissions for the SQL scripts
RUN chmod +x /sql-scripts/*.sql

# Copy the entrypoint script and set permissions
COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh

# Switch back to the mssql user
USER mssql

# Run the SQL scripts to create the database and tables
ENTRYPOINT ["/entrypoint.sh"]

# Expose the SQL Server port
EXPOSE 1433
