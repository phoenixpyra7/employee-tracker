// importing packages
const { prompt } = require("inquirer");
const db = require("./db/connection.js");
require("console.table");

const questions = [
  {
    type: "list",
    name: "answer",
    message: "What would you like to do?",
    choices: ["view all employees", "view all departments"],
  },
];

// set up inquirer here- inquirer.prompt(questions)?
function main() {
  prompt(questions).then((res) => {
    // this will all be in your inquirer's .then() - not sure if correctly done
    // this is to view info 
    if (res.answer === "View All Employees") {
      viewAllEmployees();
    } else if (res.answer === "View All Departments") {
      viewAllDepartments();
      // make an else if for view all roles
    }  else if (res.answer === "View All Roles") {
        viewAllRoles();
    // This is to add info 
    } else if (res.answer === "Add An Employee") {
        addEmployee();
    } else if (res.answer === "Add A Department") {
        addDepartment();
    } else if (res.answer === "Add A Role") {
        addRole();

    // this will exit, need to fix code
    } else if (res.answer === "Exit") {
      addDepartment();
  }});
}

// if/else statement or switch statement here
// this will be based off of the user input
// it will trigger the db functions


// db functions
function viewAllEmployees() {
  // code to retrieve all employees from the database
  db.promise()
    .query(`SELECT * FROM employees`)
    .then(([rows]) => {
      console.table(rows);
    })
    .then(() => main())
    .catch((err) => {
      console.error(`Error with viewAllEmployees: ${err}`);
    });
}
function viewAllRoles() {
  // code to retrieve all roles from the database
  db.promise()
    .query(`SELECT * FROM roles`)
    .then(([rows]) => {
      console.table(rows);
    })
    .then(() => main())
    .catch((err) => {
      console.error(`Error with viewAllRoles: ${err}`);
    });
}
function viewAllDepartments() {
  // code to retrieve all departments from the database
  db.promise()
    .query(`SELECT * FROM departments`)
    .then(([rows]) => {
      console.table(rows);
    })
    .then(() => main())
    .catch((err) => {
      console.error(`Error with viewAllDepartments: ${err}`);
    });
}


// questions will go here
// inquirer.prompt(questions)
function addDepartment() {
  prompt({
    type: "input",
    name: "department",
    message: "What department would you like to add?",
  }).then(res => {
    let department = res.department
    db.promise()
      .query("INSERT INTO departments SET ?", {department})
      .then(() => {
        console.log(`Added ${department} to departments`);
      })
      .then(() => main())
      .catch((err) => {
        console.error(`Error with addDepartment: ${err}`);
      })
  })
}

// any bonuses will go here
function calculateBonuses() {
  // code to calculate bonuses for employees
}
