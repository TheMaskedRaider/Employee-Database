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
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the new department's name?"
            }
        ])
        .then(function (answer) {
            const query = connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.name,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} department inserted!\n`);
                    runEmpTrack();
                })

        })
}

const roleDisplay = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        runEmpTrack();
    });
}

const roleCreate = () => {
connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the new role's name?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the new role's salary?"
                },
                {
                    name: 'department_id',
                    type: 'list',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({ name }) => {
                          choiceArray.push(name);
                        });
                        return choiceArray;
                      },
                    message: 'what department is the role a part of?',
                },

            ])
            .then(function (answer) {
                let chosenItem;
                console.log(answer.department_id)
                results.forEach((results) => {
                    console.log(results)
                  if (results.name === answer.department_id) {
                    chosenItem = results;
                  }
                })

                const query = connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: chosenItem.id,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} role inserted!\n`);
                        runEmpTrack();
                    })

            })
    })

}

const empDisplay = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        runEmpTrack();
    });
}
const empCreate = () => {
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        connection.query('SELECT * FROM employee', (err, results2) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "first_name",
                        message: "What is the new employee's first name?"
                    },
                    {
                        type: "input",
                        name: "last_name",
                        message: "What is the new employee's last name?"
                    },
                    {
                        name: 'role_id',
                        type: 'list',
                        choices() {
                            const choiceArray = [];
                            results.forEach(({ title }) => {
                              choiceArray.push(title);
                            });
                            return choiceArray;
                          },
                        message: "what is the employee's role?",
                    },
                    {
                        name: 'manager_id',
                        type: 'list',
                        choices() {
                            const choiceArray2 = [];
                            results2.forEach(({ first_name }) => {
                              choiceArray2.push(first_name);
                            });
                            return choiceArray2;
                          },
                        message: "Who is the employee's manager?",
                    },
    
    
                ])
                .then(function (answer) {
                    let chosenRole;
                    let chosenManager;
                    results.forEach((results) => {
                      if (results.title === answer.role_id) {
                        chosenRole = results;
                      }
                    })
                    results2.forEach((results2) => {
                        if (results2.first_name === answer.manager_id) {
                          chosenManager = results2;
                        }
                      })
    
                    const query = connection.query(
                        'INSERT INTO employee SET ?',
                        {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: chosenRole.id,
                            manager_id: chosenManager.id,
                        },
                        (err, res) => {
                            if (err) throw err;
                            console.log(`${res.affectedRows} employee added!\n`);
                            runEmpTrack();
                        })
    
                })
        })
    })
}

const empUpdate = () => {
    console.log('yo emp')
    runEmpTrack();
}