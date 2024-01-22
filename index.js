// importing packages
const inquirer = require('inquirer');
const db = require('./db/connection.js');
require('console.table');
const mysql = require('mysql2');
const env = require('dotenv'); // or just 'env'?

// set up inquirer here
const prompt = inquirer.createPromptModule(); // does const db = sql.createConn replace this? line28


// questions will go here
// inquirer.prompt(questions)

// .then()
// if/else statement or switch statement here
// this will be based off of the user input
// it will trigger the db functions

// this will all be in your inquirer's .then()
if (data.answer === 'view all employees') {
    //trigger function here
    viewAllEmployees()
}

// db functions
// connect to the database
const db = mysql.createConnection(
  {
      host: 'localhost',
      user: 'root', //MySQL username
      password: '', //MySQL password
      database: 'staff_db'// should this be db_seeds.sql
  },
  console.log('Connected to the staff_db database.') // should this be db_seeds.sql
);




// view all employees
function viewAllEmployees() {
  // code to retrieve all employees from the database
  db.promise().query(`SELECT * FROM employees`)
    .then(([rows]) => {
        console.table(rows)
    })
    .catch((err) => {
        console.log(`Error with viewAllEmployees: ${err}`)
    })
}

// etc...
// any bonuses will go here
function calculateBonuses() {
  // code to calculate bonuses for employees
}