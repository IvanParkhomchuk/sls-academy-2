const apis = [
    'https://jsonbase.com/sls-team/json-793', 'https://jsonbase.com/sls-team/json-955',
    'https://jsonbase.com/sls-team/json-231', 'https://jsonbase.com/sls-team/json-931',
    'https://jsonbase.com/sls-team/json-93', 'https://jsonbase.com/sls-team/json-342',
    'https://jsonbase.com/sls-team/json-770', 'https://jsonbase.com/sls-team/json-491',
    'https://jsonbase.com/sls-team/json-281', 'https://jsonbase.com/sls-team/json-718',
    'https://jsonbase.com/sls-team/json-310', 'https://jsonbase.com/sls-team/json-806',
    'https://jsonbase.com/sls-team/json-469', 'https://jsonbase.com/sls-team/json-258',
    'https://jsonbase.com/sls-team/json-516', 'https://jsonbase.com/sls-team/json-79',
    'https://jsonbase.com/sls-team/json-706', 'https://jsonbase.com/sls-team/json-521',
    'https://jsonbase.com/sls-team/json-350', 'https://jsonbase.com/sls-team/json-64'
];

const sendRequest = async (api) => {
    let retries = 0;
    let response = await fetch(api);

    while (!response.ok && retries < 3) {
        response = await fetch(api);
        retries++;
    }

    return response;
};

const booleanCounter = async () => {
    let trueCount = 0;
    let falseCount = 0;

    try {
        for (let api of apis) {
            const response = await sendRequest(api);

            if (!response.ok) {
                console.log(`[FAIL] ${api}: The endpoint is unavailable`);
                continue;
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

booleanCounter();
