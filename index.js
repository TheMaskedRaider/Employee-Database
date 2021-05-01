const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: '',
    database: 'employees_DB',
});

connection.connect((err) => {
    if (err) throw err;
    runEmpTrack();
});

const runEmpTrack = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                "View Departments",
                "View Roles",
                "View Employees",
                "Create Department",
                "Create Role",
                "Create Employee",
                "Update Employee Role"
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View Departments':
                    dpmtDisplay();
                    break;

                case 'View Roles':
                    roleDisplay();
                    break;

                case 'View Employees':
                    empDisplay();
                    break;

                case 'Create Department':
                    dpmtCreate();
                    break;

                case 'Create Role':
                    roleCreate();
                    break;

                case 'Create Employee':
                    empCreate();
                    break;

                case 'Update Employee Role':
                    empUpdate();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const dpmtDisplay = () => {
    console.log('hello dpmt')
    runEmpTrack();
}

const dpmtCreate = () => {
    console.log('Hi dpmt')
    runEmpTrack();
}

const roleDisplay = () => {
    console.log('hello role')
    runEmpTrack();
}

const roleCreate = () => {
    console.log('hi role')
    runEmpTrack();
}

const empDisplay = () => {
    console.log('hello emp')
    runEmpTrack();
}
const empCreate = () => {
    console.log('hi emp')
    runEmpTrack();
}

const empUpdate = () => {
    console.log('yo emp')
    runEmpTrack();
}