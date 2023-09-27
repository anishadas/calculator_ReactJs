import React, { useState } from 'react'

const Calculate = () => {
    const [input, setInput] = useState('')
    const [result, setResult] = useState(null);
    const [checkOperator, setCheckOperator] = useState(false);
    
    let operations = ['C', '+/-', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
    let orangebars = ['/', '*', '-', '+', '=']
    let exp = "";

    const handleExpression = (value) => {
        //if continously two operators are selected, we replace the first with second
        if (['+', '-', '/', '*', '%'].includes(value) && checkOperator) {
            exp = input.slice(0, -1) + value;
        } else {
            //for continous calculation on the previous result
            if (result !== null && ['+', '-', '/', '*', '%'].includes(value)) {
                exp = result + value;
            }
            //negation of a number
            else if (value === '+/-') {
                if (result) exp = (-(parseFloat(result))).toString();
                else if (result == 0) exp = result;
                else exp = (-(parseFloat(input))).toString()
            }
            //fresh calculation when there is no result yet
            else {
                exp = input + value;
            }

            //checking if two operators are together
            if (['+', '-', '/', '*', '%'].includes(value)) setCheckOperator(true);
            else setCheckOperator(false)
        }
        setInput(exp);
    }

    //when '=' is clicked
    const handleCalculation = () => {
        setCheckOperator(false)
        try {
            let res = (eval(input));
            let roundedRes = (res === Math.floor(res) ? res : (parseFloat(res).toFixed(2)).toString())
            setResult(roundedRes);

        } catch (error) {
            setResult('Error')
        }
    }

    //when 'C' is clicked
    const clearAll = () => {
        setInput("")
        setResult(null)
    }
    return (
        <div className='calculator'>
            <div className='display'>
                <span className={result !== null ? 'expression small' : 'expression'}>{input}</span>
                <span className='result'>{result}</span>
            </div>
            <div className='operations'>
                {operations.map(op => (
                    <div
                        key={op}
                        onClick={op === "=" ? handleCalculation
                            : op === 'C' ? clearAll
                                : () => handleExpression(op)}
                        className={orangebars.includes(op) ? 'ops orangebars' : op === '0' ? 'ops expand' : 'ops'}
                    >
                        {op}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calculate
