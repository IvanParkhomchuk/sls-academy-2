const inquirer = require('inquirer');
const fs = require('fs');

if (!fs.existsSync('./users.txt')) {
    fs.writeFile('./users.txt', '[]', (err) => {
        if (err) console.log(`Error: ${err}`);
    });
}

const dbFunc = async () => {
    while (true) {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: `Enter the user's name. To cancel, press ENTER: `,
            },
        ]);

        const name = answers.name.trim();

        if (name.length === 0) {
            const answer = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'checkDB',
                    message: 'Would you like to search values in the DB?',
                },
            ]);

            if (answer.checkDB) {
                fs.readFile('./users.txt', 'utf8', async (err, data) => {
                    if (err) throw err;

                    const users = JSON.parse(data);

                    console.log(users);

                    const answer = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'findUser',
                            message: `Enter the user's name you want to find in the DB: `,
                        },
                    ]);

                    const user = users.filter(u => u.name.toLowerCase() === answer.findUser.toLowerCase());

                    if (user) {
                        console.log(`User ${answer.findUser} was found`);
                        console.log(user);
                    } else {
                        console.log('User does not exist');
                    }
                });
            }

            return;
        } else {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'gender',
                    message: 'What is your gender?',
                    choices: ['Male', 'Female'],
                },
                {
                    type: 'input',
                    name: 'age',
                    message: 'How old are you?',
                },
            ]);

            const gender = answers.gender;
            const age = answers.age;

            const newUser = { name: name, gender: gender, age: age };

            fs.readFile('./users.txt', 'utf8', (err, data) => {
                const users = JSON.parse(data);
                users.push(newUser);
                fs.writeFile('./users.txt', JSON.stringify(users), err => {
                    if (err) throw err;
                });
            });
        }
    }
};

dbFunc();
