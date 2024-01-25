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
      "Add A Department", 
      "Add A Role", 
      "Add An Employee", 
      "Update An Employee Role",
      "Exit Database"
    ],
  },
];



// set up inquirer here. this will all be in the inquirer"s .then() 
function main() {
  prompt(questions).then((res) => { 

//main menu actions
    // this is to view all info 
    if (res.answer === "View All Departments") {
      viewAllDepartments();
    } else if (res.answer === "View All Roles") {
      viewAllRoles();
    }  else if (res.answer === "View All Employees") {
      viewAllEmployees();
    // }  else if (res.answer === "View All Salarys") { // this may pose a problem so i mispelled it to match
    //   viewAllSalarys();

    // This is to add info 
    } else if (res.answer === "Add A Department") {
      addDepartment();
    } else if (res.answer === "Add A Role") {
      addRole();
    } else if (res.answer === "Add An Employee") {
      addAnEmployee();
    // } else if (res.answer === "Add A Salary") {
    //   addSalary();

    // this is to update employee role info 
    } else if (res.answer === "Update An Employee Role") {
      updateAnEmployeeRole(); 
    // } else if (res.answer === "Update Department") {
    //   updateDepartment();
    // } else if (res.answer === "Update Role") {
    //   updateRole();
    // } else if (res.answer === "Update Salary") {
    //   updateSalary(); 

    // this will exit th db
    } else if (res.answer === "Exit Database") {
      db.end();
      console.log("You have sucessfully exited the database"); // added confirmation message
      return process.exit(); 
  }});
}


//db view all functions
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


// db function to add a new department
function addDepartment() {
  prompt({
    type: "input",
    name: "department",
    message: "What department would you like to add?",
  }).then(res => {
    if (res && res.department) {
    let department = res.department;
    db.promise()
      .query("INSERT INTO departments (name) VALUES (?); ", [department])
      .then(() => {
        console.log(`Added ${department} to departments`);
      })
      .then(() => main())
      .catch((err) => {
        console.error(`Error with addDepartment: ${err}`);
      });
    } else {
      console.log("Department name cannot be blank");
      addDepartment();
    }
  }).catch((err) => {
    console.error(`Error with addDepartment: ${err}`);
  });
}
// db function to add a new role
function addRole() {
  prompt([
  {
    type: "input",
    name: "title",
    message: "What role would you like to add?",
  },
  {
    type: "number",   
    name: "salary",
    message: "What is the salary of the role",
  },
  {
    type: "list",
    name: "department_id",
    message: "What is the department for the role:",
    choices: () => db.promise().query("SELECT * FROM departments").then(([rows]) => rows.map(department => ({
        name: department.name,
        value: department.id,
    })),
    ),
  },
]).then(res => {
    db.promise()
      .query("INSERT INTO roles SET ?", res) 
      .then(() => {
        console.log(`Added ${res.title} to roles`);
      })
      .then(() => main())
      .catch((err) => {
        console.error(`Error with addRole: ${err}`);
      });
  });
}
// db function to add a new employee
function addAnEmployee() { 
  prompt([ 
    {
      type: "input",
      name: "first_name",
      message: "Enter the first name of the employee.", 
  },
    {
      type: "input",
      name: "last_name",
      message: "Enter the last name of the employee.",
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the role of the employee.",
      choices: () => db.promise().query("SELECT * FROM roles").then(([rows]) => rows.map(role => ({
        name: role.title, 
        value: role.id, 
    })))
    },
    {
      type: "list", 
      name: "manager_id", 
      message: "Select the manager of the employee.",
      choices: () => db.promise().query("SELECT * FROM employees").then(([rows]) => rows.map(manager => ({
        name: manager.first_name + " " + manager.last_name,
        value: manager.id,
    }))) 
    }
  ]).then(res => {
    db.promise()
      .query("INSERT INTO employees SET ?", res) 
      .then(() => {
        console.log(`Added ${res.first_name} ${ res.last_name} to employees`);
      })
      .then(() => main())
      .catch((err) => {
        console.error(`Error with addEmployee: ${err}`);
      });
  });
}
// db function to update an existing employee's role
function updateAnEmployeeRole() {
  // db function to retrieve all employees to select from
  prompt({
    type: "list",
    name: "employee_id",
    message: "Which employee would you like to update?",
    choices: () => db.promise().query("SELECT * FROM employees").then(([rows]) => rows.map(employee => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
    }))),
  }) // db function to retrieve all roles to select from which will now be the new role for the employee
  .then(({employee_id}) => {
    prompt({
      type: "list",
      name: "role_id",
      message: "What is their new role?",
      choices: () => db.promise().query("SELECT * FROM roles").then(([rows]) => rows.map(role => ({
          name: role.title,
          value: role.id,
      }))), // this will update the role for the employee
    }).then(({role_id}) => {
      db.promise()
        .query("UPDATE employees SET role_id = ? WHERE id = ?", [role_id, employee_id])
        .then(() => {
          console.log(`Updated employee's role`);
        })
        .then(() => main()) // return to main menu
        .catch((err) => {
          console.error(`Error with updateAnEmployeeRole: ${err}`);
        });
    })
  })
}

main();  //this is the same as using init but i want it to be more taylored so i chose to use main.


// any bonuses will go here if I get time
// function calculateBonuses() {
//   // code to calculate bonuses for employees
// }
