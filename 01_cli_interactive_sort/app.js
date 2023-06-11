const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const sortingFunc = () => {
    rl.question('Enter a few words or numbers separated by a space: ', (input) => {
        let items = input.split(' ');

        rl.question('How would you like to sort values:\n' +
            '1. Sort words alphabetically\n' +
            '2. Show numbers from lesser to greater\n' +
            '3. Show numbers from bigger to smaller\n' +
            '4. Display words in ascending order by number of letters in the word\n' +
            '5. Show only unique words\n' +
            '6. Display only unique values from the set of words and numbers entered by the user\n' +
            '7. To exit the program enter "exit"\n' +
            '\nYour choice: ', (userChoice) => {

            switch (userChoice) {
                case '1':
                    items = items.filter(value => isNaN(+value));
                    items.sort();
                    break;
                case '2':
                    items = items.filter(value => !isNaN(+value));
                    items.sort((a, b) => a - b);
                    break;
                case '3':
                    items = items.filter(value => !isNaN(+value));
                    items.sort((a, b) => b - a);
                    break;
                case '4':
                    items = items.filter(value => isNaN(+value));
                    items.sort((a, b) => a.length - b.length);
                    break;
                case '5':
                    items = items.filter((value, index, array) => {
                        return isNaN(+value) &&
                            typeof value === 'string' &&
                            array.indexOf(value) === index
                    });
                    break;
                case '6':
                    items = items.filter((value, index, array) => array.indexOf(value) === index);
                    break;
                case 'exit':
                    rl.close();
                    return;
                default:
                    sortingFunc();
                    return;
            }

            console.log('\nSorted input:', items, '\n');
            sortingFunc();
        });
    });
};

sortingFunc();
