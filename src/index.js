function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = removeSpaces(expr)

    function removeSpaces(someString) {  
        return someString.split(' ').join('')
    }
    function UserException(message) {
        this.message = message;
        this.name = "User exception";
     }

    //умножение
    function multiply(someString) {
        //создаем будущий объект маппинга
        let multiplyObj = {}

        //разделяем строку по всез знакам кроме умножения и создаем массив
        let newString = someString.split(/[/]|[-]|[+]/g)

        //находим в массиве элементы с * разделяем их и перемножаем
        for (let index = 0; index < newString.length; index++) {
            if (newString[index].includes('*')) {

                //запомним что перемножаем что бы заменить
                let willMultiply = newString[index];
                let multiplyNumbers = newString[index].split('*');
                //перемножим элементы в массиве
                let result = 1
                for (let index = 0; index < multiplyNumbers.length; index++) {
                    result *= multiplyNumbers[index]
                }
                //записываем в объект результаты
                multiplyObj[willMultiply] = result
            }; 
        }
        // заменяем перемноженный результат из объхекта в строку
        for (const key in multiplyObj) {
            someString = someString.replace(key, multiplyObj[key] )
        }
        return someString
    }

    //деление 
    
    function division(someString) {
        //создаем будущий объект маппинга
        let divisObg = {}

        //разделяем строку по всез знакам кроме деления и создаем массив
        let newString = someString.split(/[*]|[-]|[+]/g)

        //находим в массиве элементы с / разделяем их и делим
        for (let index = 0; index < newString.length; index++) {
            if (newString[index].includes('/')) {

                //запомним что делим что бы заменить в будущем
                let willDivis = newString[index];
                let divisNumbers = newString[index].split('/');
                //поделим элементы в массиве
                let result = Number(divisNumbers[0])
                // проходимся с индекса 1 потому что мы 0 уже присвоили
                for (let index = 1; index < divisNumbers.length; index++) {

                    if (Number(divisNumbers[index]) === 0) {

                        throw new Error("TypeError: Division by zero.")
                    
                    }

                    result = result/Number(divisNumbers[index])
                }
                //записываем в объект результаты
                divisObg[willDivis] = result
            }; 
        }
        // заменяем перемноженный результат из объхекта в строку
        for (const key in divisObg) {
            someString = someString.replace(key, divisObg[key] )
        }
        return someString
    }

    function sumAndDiff(someString) {
        //создаем будущий объект маппинга
        let sumObg = {}

        let newString = someString.split()
        //console.log(newString)
         //находим в массиве элементы с +/- разделяем их и складываем
         for (let index = 0; index < newString.length; index++) {
            if (newString[index].includes('-') || newString[index].includes('+')) {
                //запомним что складываем что бы заменить
                let willSum = newString[index];
                let sumNumbers = newString[index].match(/[+-]?([0-9]*[.])?[0-9]+/g);
               // console.log(sumNumbers)
                //сложим элементы в массиве
                let result = 0
                for (let index = 0; index < sumNumbers.length; index++) {
                    result += Number(sumNumbers[index])
                }
                    //записываем в объект результаты
                sumObg[willSum] = result
            }
        }
        //заменяем то что сложили в сроке
        //console.log(sumObg)
        for (const key in sumObg) {
            someString = someString.replace(key, sumObg[key] )
        }
        return someString
    }

    function diff(someString) {
        //создаем будущий объект маппинга
        let diffObg = {}

        let newString = someString.split(/[+]/g)

         //находим в массиве элементы с - разделяем их и вычетаем
         for (let index = 0; index < newString.length; index++) {
            if (newString[index].includes('-')) {

                //запомним что вычетаем что бы заменить
                let willDiff = newString[index];
                let diffNumbers = newString[index].split('-');
                //вычтем элементы в массиве
                let result = diffNumbers[0]
                for (let index = 1; index < diffNumbers.length; index++) {
                    result -= Number(diffNumbers[index])
                }
                //записываем в объект результаты
                diffObg[willDiff] = result
            }; 
        }
        //заменяем то что вычли в сроке
        for (const key in diffObg) {
            someString = someString.replace(key, diffObg[key] )
        }
        return someString
    }
    
    expr = division(expr)
    console.log(expr)
    expr = multiply(expr)
   console.log(expr)
    expr = sumAndDiff(expr)
   console.log(expr)
    return Number(expr)
}

module.exports = {
    expressionCalculator
}

// expressionCalculator(" 49 * 63 / 58 /44 * 36 * 39 + 32 - 41")
// expressionCalculator('2*3')
// expressionCalculator('49 * 63 / 58 * 36')
//Division by zero
