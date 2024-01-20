// Import and require mysql2
const mysql = require('mysql2');

// Connect to db
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password not necessary
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );
      // make it so that it connects or throws an error
  db.connect((err) => {
      if (err) throw err;
  })

  module.exports = db