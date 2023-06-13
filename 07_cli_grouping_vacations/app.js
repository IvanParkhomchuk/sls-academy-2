const fs = require('fs');

const groupVacations = async () => {
    try {
        const response = await fetch('https://jsonbase.com/sls-team/vacations');
        const users = await response.json();

        const userNamesArray = [];

        users.forEach(userObj => {
            userNamesArray.push(userObj.user.name);
        });

        const userUniqueNamesArray = Array.from(new Set(userNamesArray));
        const resultUsersArray = [];

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

            resultUsersArray.push(newUserObj);
        });

        fs.writeFile('./users.json', JSON.stringify(newUserArray), (err) => {
            if (err) console.log(`Error: ${err}`);
        });

        console.log(newUserArray);
    } catch (e) {
        console.log('Something go wrong: ' + e);
    }
};

groupVacations();
