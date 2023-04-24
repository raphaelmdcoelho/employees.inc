const express = require('express');
const bodyParser = require('body-parser');
const { ConnectionPool } = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

// Database configuration
const dbConfig = {
  user: 'sa',
  password: 'SqlServer2023*',
  server: 'localhost',
  database: 'companyir',
  options: {
    enableArithAbort: true
  }
};

// Middleware
app.use(bodyParser.json());

// API endpoint
app.post('/api/employees', async (req, res) => {
  try {

    console.log('starting saving the data');

    const pool = await new ConnectionPool(dbConfig).connect();
    const request = pool.request();
    request.input('firstName', req.body.firstName);
    request.input('lastName', req.body.lastName);
    request.input('dateOfBirth', req.body.dateOfBirth);
    request.input('gender', req.body.gender);
    request.input('role', 1);

    const result = await request.query(`
      INSERT INTO employees (firstName, lastName, dateOfBirth, gender, role)
      VALUES (@firstName, @lastName, @dateOfBirth, @gender, @role);
    `);

    res.status(201).send({ message: 'Employee created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while processing your request' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
