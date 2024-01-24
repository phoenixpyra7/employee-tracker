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
      "Add A Department", // this seems to be working?
      "Add A Role", //still not working after all prompts answered
      "Add An Employee", //haven't tested this fully
      // "Update AnEmployee Role", // dont think i have all the code for this, cannot find might have accidentally deleted it
      "Exit Database"
    ],
  },
];



// set up inquirer here. this will all be in the inquirer"s .then() 
function main() {
  prompt(questions).then((res) => { ///  is this section repetitive code of line 6?

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

//// QUESTION, would it be more effie=cient to make all functions into nesting dolls so i can update or add/delete as needed with out seperate sections?

// Adding a new department
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

// function addDepartment() {
//   prompt({
//     type: "input",
//     name: "department",
//     message: "What department would you like to add?",
//   }).then(res => {
//     let department = res.department
//     db.promise()
//       .query("INSERT INTO departments (name) VALUES (?); ", [department])
//       .then(() => {
//         console.log(`Added ${department} to departments`);
//       })
//       .then(() => main())
//       .catch((err) => {
//         console.error(`Error with addDepartment: ${err}`);
//       })
//   })
// }



//Adding a new role

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

// function addRole() {
//   prompt([
//   {
//     type: "input",
//     name: "role",
//     message: "What role would you like to add?",
//   },
//   {
//     type: "number",   
//     name: "salary",
//     message: "What is the salary of the role",
//   },
//   {
//     type: "list",
//     name: "departmentId",
//     message: "What is the department for the role:",
//     choices: () => db.promise().query("SELECT * FROM departments").then(([rows]) => rows.map(department => ({
//         name: department.name,
//         value: department.id,
//     })),
//     ),
//   },
// ]).then(res => {
//     let role = res.role;
//     let salary = res.salary;
//     let departmentId = res.departmentId;
//     db.promise()
//       .query("INSERT INTO roles (title, salary, department_id) VALUES [?, ?, ?]", ["role", "salary", "departmentId"]) // added ind instead of id
//       .then(() => {
//         console.log(`Added ${role} to roles`);
//       })
//       .then(() => main())
//       .catch((err) => {
//         console.error(`Error with addRole: ${err}`);
//       });
//   });
// }




//Adding a new employee
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

main();  //this is the same as using init but i want it to be more taylored so i am using main.




// any bonuses will go here if I get time
// function calculateBonuses() {
//   // code to calculate bonuses for employees
// }
