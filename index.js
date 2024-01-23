// importing packages
const { prompt } = require("inquirer");
const db = require("./db/connection.js");
const { NULL } = require("mysql2/lib/constants/types.js");
require("console.table");
const questions = [ 
  {
    type: "list",
    name: "answer",
    message: "What would you like to do?",
    choices: [
      "View All Departments", 
      "View All Roles", 
      "View All Employees", 
      // "View All Salarys",
      // "Add An Employee",
      "Add A Department",
      // "Add A Role",
      // "Add A Salary",
      // "Update Employee",
      // "Update Department",
      // "Update Role",
      // "Update Salary",
      "Exit Database"
    ],
  },
];



// set up inquirer here- inquirer.prompt(questions)?
function main() {
  prompt(questions).then((res) => {
    // this will all be in your inquirer's .then() - not sure if correctly done

    // this is to view all info 
    if (res.answer === "View All Employees") {
      viewAllEmployees();
    } else if (res.answer === "View All Departments") {
      viewAllDepartments();
    }  else if (res.answer === "View All Roles") {
      viewAllRoles();
    }  else if (res.answer === "View All Salarys") { // this may pose a problem so i mispelled it to match
      viewAllSalarys();

    // This is to add info 
    } else if (res.answer === "Add An Employee") {
      addAnEmployee();
    } else if (res.answer === "Add A Department") {
      addDepartment();
    } else if (res.answer === "Add A Role") {
      addRole();
    } else if (res.answer === "Add A Salary") {
      addSalary();

    // this is to update info 
    } else if (res.answer === "Update Employee") {
      updateEmployee(); 
    } else if (res.answer === "Update Department") {
      updateDepartment();
    } else if (res.answer === "Update Role") {
      updateRole();
    } else if (res.answer === "Update Salary") {
      updateSalary(); 

    // this will exit, need to fix code
    } else if (res.answer === "Exit Database") {
      db.end();
      console.log("You have sucessfully exited the database"); 
      return process.exit(); 
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
    // .then((response) => {
    //   console.log(response)
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
function viewAllSalaries() {
  // code to retrieve all roles from the database
  db.promise()
    .query(`SELECT * FROM salarys`)
    .then(([rows]) => {
      console.table(rows);
    })
    .then(() => main())
    .catch((err) => {
      console.error(`Error with viewAllSalarys: ${err}`);
    });
}

// questions will go here
// inquirer.prompt(questions)

// Adding a new department
function addDepartment() {
  prompt({
    type: "input",
    name: "department",
    message: "What department would you like to add?",
  }).then(res => {
    let department = res.department
    db.promise()
      .query("INSERT INTO departments (name) VALUES (?); ", [department])
      .then(() => {
        console.log(`Added ${department} to departments`);
      })
      .then(() => main())
      .catch((err) => {
        console.error(`Error with addDepartment: ${err}`);
      })
  })
}
//Adding a new role
function addRole() {
  prompt({
    type: "input",
    name: "role",
    message: "What role would you like to add?",
  }).then(res => {
    let role = res.role
    db.promise()
      .query("INSERT INTO roles SET ?", {role})
      .then(() => {
        console.log(`Added ${role} to roles`);
      })
      .then(() => main())
      .catch((err) => {
        console.error(`Error with addRole: ${err}`);
      })
  })
}

//Adding a new employee
function addAnEmployee(roles, managers) { // shouldn't this have more info in the ()?
  prompt.questions = [ //should I remove the word-> "" questions"?
    {
      type: "input",
      name: "firstName",
      message: "Enter the first name of the employee.", //should I add a salary question? 
  },
    {
      type: "input",
      name: "lastName",
      message: "Enter the last name of the employee.",
    },
    {
      type: "list",
      name: "roleId",
      message: "Selectthe role of the employee.",
      choices: [
        `
        Controller, 
        Accounts Receivable, 
        Accounts Payable, 
        Property Manager, 
        Leasing Agent, 
        Human Resources Manager, 
        Marketing Analyst, 
        Marketing Assistant
      `
    ]
    },
    {
      type: "list",
      name: "managerId",
      message: "Select the manager of the employee.",
      choices: [1,2,7, NULL],
    }
  ];

  prompt(questions).then(saveEmployee);
}

main();




// any bonuses will go here
// function calculateBonuses() {
//   // code to calculate bonuses for employees
// }
