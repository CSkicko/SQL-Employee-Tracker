// Import Dependencies
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Import the sql commander class and set up new object to produce sql query strings
const Sqlcmdr = require('./lib/sqlcmdr');
const queries = new Sqlcmdr;

// Set the port
const PORT = process.env.PORT || 3001;
// Set up the express app
const app = express();

// Connect with the database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Pn7LHHbp!',
      database: 'employee_tracker_db'
    },
);

// Dummy queries to test sqlcmdr
function menu() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'selection',
                choices: [
                    'View all departments', 
                    'View all roles', 
                    'View all employees', 
                    'Add a department', 
                    'Add a role', 
                    'Add an employee', 
                    'Update an employee role', 
                    'Exit'
                ],
            },
        ])
        .then((data) => {
            switch(data.selection) {
                case 'View all departments':
                    viewDept();
                    break;
                case 'View all roles':
                    viewRole();
                    break;
                case 'View all employees':
                    viewEmp();
                    break;
                case 'Add a department':
                    addDept();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmp();
                    break;
                case 'Update an employee role':
                    updateRole();
                    break;
                case 'Exit':
                    console.log("Goodbye!")
                    process.exit();
                    break;
            }
        });
};

function viewDept() {
    db.query(queries.getDepts(), function (err, results) {
        console.table(results);
        menu();
    });
};

function viewRole() {
    db.query(queries.getRoles(), function (err, results) {
        console.table(results);
        menu();
    });
};

function viewEmp() {
    db.query(queries.getEmps(), function (err, results) {
        console.table(results);
        menu();
    });
};

function addDept() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please insert the new department name:',
                name: 'department',
            },
        ])
        .then((data) => {
            db.query(queries.addDept(data.department), function (err, results) {
                console.log('New Department Successfully Added!');
                menu();
            });
        });
};

function addRole() {
    let deptList = [];
    let deptSelected;
    // Get the list of departments
    db.query(queries.getDepts(), function (err, deptResults) {
        for (const department of deptResults) {
            deptList.push(department.name);
        }
        // Get the user inputted data
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please insert the new role:',
                name: 'role',
            },
            {
                type: 'input',
                message: 'Please insert the new role salary:',
                name: 'salary',
            },
            {
                type: 'list',
                message: 'Please select the associated department for the new role:',
                name: 'dept',
                choices: deptList,
            },
        ])
        .then((data) => {
            // Get the id of the selected department
            for (const department of deptResults) {
                if (data.dept == department.name) {
                    deptSelected = department.id;
                }
            };
            // Add the data to the database
            db.query(queries.addRole(data.role, data.salary, deptSelected), function (err, results) {
                console.log('New Role Successfully Added!');
                menu();
            });
        });
    });
    
}

function addEmp() {
    let empList = [];
    let empSelected;
    let roleList = [];
    let roleSelected;

    // Get the list of Employees
    db.query(queries.getEmps(), function (err, empResults) {
        for (const employee of empResults) {
            const fullName = `${employee.first_name} ${employee.last_name}`
            empList.push(fullName);
        }
        empList.push('No Manager');

        // Get the list of roles
        db.query(queries.getRoles(), function (err, roleResults) {
            for (const role of roleResults) {
                roleList.push(role.title);
            }
            console.log(roleList);

            // Get the user inputed data
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Please insert the first name of the new employee:',
                    name: 'fname',
                },
                {
                    type: 'input',
                    message: 'Please insert the last name of the new employee:',
                    name: 'lname',
                },
                {
                    type: 'list',
                    message: 'Please select the new employees role:',
                    name: 'role',
                    choices: roleList,
                },
                {
                    type: 'list',
                    message: 'Please select the new employees manager:',
                    name: 'manager',
                    choices: empList,
                },
            ])
            .then((data) => {
                // Get the id of the selected department
                for (const role of roleResults) {
                    if (data.role == role.title) {
                        roleSelected = role.id;
                    }
                };
                // Get the id of the selected manager
                if (data.manager == 'No Manager'){
                    empSelected = null;
                } else {
                    for (const emp of empResults) {
                        if (data.manager.includes(emp.first_name) && data.manager.includes(emp.last_name)) {
                            empSelected = emp.id;
                        }
                    };
                }
                
                // Add the data to the database
                db.query(queries.addEmp(data.fname, data.lname, roleSelected, empSelected), function (err, results) {
                    console.log('New Employee Successfully Added! ');
                    menu();
                });
            });
        })
    });
};

function updateRole() {
    let empList = [];
    let empSelected;
    let roleList = [];
    let roleSelected;

    db.query(queries.getEmps(), function (err, empResults) {
        for (const employee of empResults) {
            const fullName = `${employee.first_name} ${employee.last_name}`
            empList.push(fullName);
        }
        console.log(empList);

        // Get the list of roles
        db.query(queries.getRoles(), function (err, roleResults) {
            for (const role of roleResults) {
                roleList.push(role.title);
            }
            console.log(roleList);

            // Get the user inputed data
            inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Please select the employee whos role you would like to update:',
                    name: 'manager',
                    choices: empList,
                },
                {
                    type: 'list',
                    message: 'Please select the employees new role:',
                    name: 'role',
                    choices: roleList,
                },
                
            ])
            .then((data) => {
                // Get the id of the selected department
                for (const role of roleResults) {
                    if (data.role == role.title) {
                        roleSelected = role.id;
                    }
                };
                // Get the id of the selected manager
                for (const emp of empResults) {
                    if (data.manager.includes(emp.first_name) && data.manager.includes(emp.last_name)) {
                        empSelected = emp.id;
                    }
                };

                // Update the role in the database
                db.query(queries.updateEmpRole(empSelected, roleSelected), function (err, results) {
                    console.log('Employee role successfully updated!');
                    menu();
                });
            });
        })
    });
}

// Start listening on localhost port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    menu();
  });