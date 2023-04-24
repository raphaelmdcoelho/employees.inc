const express = require('express');
const bodyParser = require('body-parser');
const { ConnectionPool } = require('mssql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Database configuration
const dbConfig = {
  user: 'sa',
  password: 'SqlServer2023*',
  server: 'db',
  database: 'company',
  options: {
    enableArithAbort: true,
    encrypt: true,
    trustServerCertificate: true
  }
};

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoint
app.post('/api/employees', async (req, res) => {
  try {

    console.log('starting saving the data');

    const pool = await new ConnectionPool(dbConfig).connect();
    const request = pool.request();
    request.input('firstName', req.body.firstName);
    request.input('lastName', req.body.lastName);
    request.input('birthDate', req.body.dateOfBirth);
    request.input('gender', req.body.gender);
    request.input('role', '00a6fa25-df29-4701-9077-557932591766');

    const result = await request.query(`
      INSERT INTO employee (firstName, lastName, birthDate, gender, role)
      VALUES (@firstName, @lastName, @birthDate, @gender, @role);
    `);

    res.status(201).send({ message: 'Employee created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while processing your request. Exception: ' + error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
