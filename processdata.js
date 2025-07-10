const readline = require('readline');

function processData(data) {
    function isUpperCaseLetter(char) {
        return char >= 'A' && char <= 'Z';
    }

    function isNumber(char) {
        return char >= '0' && char <= '9';
    }

    function isValidCode(code) {
        if (code.length !== 7) return false;
        for (let i = 0; i < 3; i++) {
            if (!isUpperCaseLetter(code[i])) return false;
        }
        for (let i = 3; i < 7; i++) {
            if (!isNumber(code[i])) return false;
        }
        return true;
    }

    const totalCodes = data.length;
    let validCodes = 0;
    let invalidCodes = 0;
    let normalizedValidCodes = [];

    for (let i of data) {
        let normalizedCode = i.toUpperCase();
        if (isValidCode(normalizedCode)) {
            validCodes++;
            normalizedValidCodes.push(normalizedCode);
        } else {
            invalidCodes++;
        }
    }

    normalizedValidCodes.sort();

    return {
        totalCodes,
        validCodes,
        invalidCodes,
        normalizedValidCodes
    };
}

if (require.main === module) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter codes (comma separated): ", (answer) => {
        const input = answer.split(",").map(item => item.trim());
        const result = processData(input);
        console.log(JSON.stringify(result, null, 2));
        rl.close();
    });
}

module.exports = { processData };