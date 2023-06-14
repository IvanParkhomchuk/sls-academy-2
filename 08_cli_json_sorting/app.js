const apis = [
    'https://jsonbase.com/sls-team/json-793', 'https://jsonbase.com/sls-team/json-955',
    'https://jsonbase.com/sls-team/json-231', 'https://jsonbase.com/sls-team/json-931',
    'https://jsonbase.com/sls-team/json-93', 'https://jsonbase.com/sls-team/json-342',
    'https://jsonbase.com/sls-team/json-770', 'https://jsonbase.com/sls-team/json-491',
    'https://jsonbase.com/sls-team/json-281', 'https://jsonbase.com/sls-team/json-718',
    'https://jsonbase.com/sls-team/json-310123', 'https://jsonbase.com/sls-team/json-806',
    'https://jsonbase.com/sls-team/json-469', 'https://jsonbase.com/sls-team/json-258',
    'https://jsonbase.com/sls-team/json-516', 'https://jsonbase.com/sls-team/json-79',
    'https://jsonbase.com/sls-team/json-706', 'https://jsonbase.com/sls-team/json-521',
    'https://jsonbase.com/sls-team/json-350', 'https://jsonbase.com/sls-team/json-64'
];

const myFunc = async () => {
    let trueCount = 0;
    let falseCount = 0;
    let errorLog;

    try {
        outer: for (let api of apis) {
            let response = await fetch(api);
            let retries = 0;

            while (!response.ok && retries < 3) {
                response = await fetch(api);

                if (!response.ok && retries === 2) {
                    errorLog = api;

                    console.log(`[FAIL] ${errorLog}: The endpoint is unavailable`);
                    continue outer;
                }

                retries++;
            }

            const data = await response.json();

            for (let objKey in data) {
                const isDone = data[objKey].hasOwnProperty('isDone')
                    ? data[objKey].isDone
                    : objKey === 'isDone' ? data[objKey] : undefined;

                if (isDone !== undefined) {
                    console.log(`[SUCCESS] ${api}: isDone - ${isDone}`);

                    if (isDone) trueCount++;
                    else falseCount++;
                }
            }

        }

        console.log(`Found True values: ${trueCount}`);
        console.log(`Found False values: ${falseCount}`);
    } catch {
        console.log('something go wrong');
    }
}

myFunc();
