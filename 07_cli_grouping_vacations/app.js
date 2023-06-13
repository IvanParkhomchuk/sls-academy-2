const fs = require('fs');

const myFunc = async () => {
    try {
        const response = await fetch('https://jsonbase.com/sls-team/vacations');
        const users = await response.json();

        const userNamesArray = [];

        users.forEach(user => {
            userNamesArray.push(user.user.name);
        });

        const userUniqueNamesArray = Array.from(new Set(userNamesArray));
        const newUserArray = [];

        userUniqueNamesArray.forEach(userName => {
            const userObjArr = users.filter(user => user.user.name === userName);
            const newUserObj = {
                userId: userObjArr[0].user._id,
                userName: userObjArr[0].user.name,
                vacations: []
            };

            userObjArr.forEach(separateUserObj => {
                const vacationDatesObj = {
                    startDate: separateUserObj.startDate,
                    endDate: separateUserObj.endDate
                };

                newUserObj.vacations.push(vacationDatesObj);
            });

            newUserArray.push(newUserObj);
        });

        fs.writeFile('./users.json', JSON.stringify(newUserArray), (err) => {
            if (err) console.log(`Error: ${err}`);
        });

        console.log(newUserArray);
    } catch (e) {
        console.log('Something go wrong: ' + e);
    }
};

myFunc();
