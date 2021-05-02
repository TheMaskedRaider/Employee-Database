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
                "Update Employee Role",
                "Quit"
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

                case "Quit":
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const dpmtDisplay = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        runEmpTrack();
    });
}

const dpmtCreate = () => {
    console.log('Hi dpmt')
    runEmpTrack();
}

const roleDisplay = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        runEmpTrack();
    });
}

const roleCreate = () => {
    console.log('hi role')
    runEmpTrack();
}

const empDisplay = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        runEmpTrack();
    });
}
const empCreate = () => {
    console.log('hi emp')
    runEmpTrack();
}

const empUpdate = () => {
    console.log('yo emp')
    runEmpTrack();
}