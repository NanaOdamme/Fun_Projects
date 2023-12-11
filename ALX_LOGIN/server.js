const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const config = {
  user: 'Akosua',
  password: 'your_sql_server_password',
  server: 'NANA_AKOSUA\SQLEXPRESS',
  database: 'Persons',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};

// Middleware to parse JSON in the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML and static files
app.use(express.static('public'));

// Handle login POST request
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Validate the input (basic validation, you should implement more)
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  //'users' table with 'email' and 'password' columns
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

  executeQuery(query)
    .then((result) => {
      if (result.recordset.length > 0) {
        // Login successful
        res.json({ success: true, message: 'Login successful' });
      } else {
        // Login failed
        res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    })
    .catch((err) => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

async function executeQuery(query) {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(query);
    return result;
  } catch (err) {
    throw err;
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

