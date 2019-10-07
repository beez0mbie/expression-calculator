function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = removeSpaces(expr)
    checkPairsOfBrackets(expr)
    expr = findBrackets(expr)
    expr = division(expr)
    expr = multiply(expr)
    expr = sumAndDiff(expr)

    function removeSpaces(someString) {  
        return someString.split(' ').join('')
    }

    function checkPairsOfBrackets(expr) {
        let left = 0
        let right = 0
        //Check pairs of brackets
        for (let index = 0; index < expr.length; index++) {
            if (expr[index] === '(') {
                left++
            } else if (expr[index] === ')') {
                right++
            }
        }
        if (!((left+right)%2 === 0) || left !== right){
            throw new Error("ExpressionError: Brackets must be paired")
        }
    }

    //Multiply
    function multiply(someString) {
        //Need for mapping
        let multiplyObj = {}

        //Split without *+ or +-
        let newString = someString.split(/\b[-+/]/g)

        //find only * split it and multiply
        for (let index = 0; index < newString.length; index++) {
            if (newString[index].includes('*')) {

                //remember than multiply for future change
                let willMultiply = newString[index];
                let multiplyNumbers = newString[index].split('*');
                //multiply elements
                let result = 1
                for (let index = 0; index < multiplyNumbers.length; index++) {
                    result *= multiplyNumbers[index]
                }
                //remember that we multiply in obj
                multiplyObj[willMultiply] = result
            }; 
        }
        // find in string that we multiply and replace with result
        for (const key in multiplyObj) {
            someString = someString.replace(key, multiplyObj[key] )
        }
        return someString
    }

    //Division
    function division(someString) {
        //Need for mapping
        let divisObg = {}

        //Split without /+ or /-
        let newString = someString.split(/\b[-+*]/g)

         //find only / split it and multiply
        for (let index = 0; index < newString.length; index++) {
            if (newString[index].includes('/')) {

                //remember than divis for future change
                let willDivis = newString[index];
                let divisNumbers = newString[index].split('/');
                //divis elements
                let result = Number(divisNumbers[0])
                // let start from 1 index because 0 index we put into result
                for (let index = 1; index < divisNumbers.length; index++) {

                    if (Number(divisNumbers[index]) === 0) {
                        throw new Error("TypeError: Division by zero.")
                    }
                    result = result/Number(divisNumbers[index])
                }
                //remember that we divis in obj
                divisObg[willDivis] = result
            }; 
        }
        // find in string that we divis and replace it with result
        for (const key in divisObg) {
            someString = someString.replace(key, divisObg[key] )
        }
        return someString
    }

    function sumAndDiff(someString) {
        //Need for mapping
        let sumObg = {}
        let newString = someString.split()
         //find only + or - split it and summarize
         for (let index = 0; index < newString.length; index++) {
            if (newString[index].includes('-') || newString[index].includes('+')) {
                //remember than summarize for future change
                let willSum = newString[index];
                let sumNumbers = newString[index].match(/[+-]?([0-9]*[.])?[0-9]+/g);
                //summarize elements
                let result = 0
                for (let index = 0; index < sumNumbers.length; index++) {
                    result += Number(sumNumbers[index])
                }
                //remember that we summarize in obj
                sumObg[willSum] = result
            }
        }
        // find in string that we summarize and replace it with result
        for (const key in sumObg) {
            someString = someString.replace(key, sumObg[key] )
        }
        return someString
    }

    function findBrackets(expr) {
        while (expr.includes('(') && expr.includes(')') ) {
            let innerExpr = expr.match(/[(][^()]*[)]/g)

            for (let index = 0; index < innerExpr.length; index++) {
                result = expressionCalculator(innerExpr[index].slice(1,innerExpr[index].length-1))
                expr = expr.replace(innerExpr[index],result)
                
            }
            findBrackets(expr)
        }
        return expr
    }
    
    return Number(expr)
}

module.exports = {
    expressionCalculator
}