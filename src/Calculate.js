import React, { useState } from 'react'
import { evaluate,round } from 'mathjs';

const Calculate = () => {
    const [input, setInput] = useState('')
    const [result, setResult] = useState(null);
    const [checkOperator, setCheckOperator] = useState({ isOperator: false, value:null});
    
    //storing all operators and operands
    let operations = ['C', '+/-', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
    
    // storing operators for dynamic code- orange color bars
    let orangebars = ['/', '*', '-', '+', '=']
    let exp = "";

    const handleExpression = (value) => {
        //if continously two operators are selected, we replace the first with second
        if (['+', '-', '/', '*', '%', '.'].includes(value) && checkOperator.isOperator) {
           
            exp = input.slice(0, -1) + value;
            setCheckOperator({isOperator:true,value})
        } else {
            setCheckOperator({ isOperator: false, value:value })
            //for continous calculation on the previous result
            if (result !== null && ['+', '-', '/', '*', '%'].includes(value)) {

                exp = input===result?result + value:input+value;
            }
            //negation of a number
            else if (value === '+/-') {
                if (result) {
                    exp = (-(parseFloat(result))).toString();
                    setResult(exp)
                }
                else if(result === 0) {
                    exp = result;
                    setResult(exp);
                }
                else exp = (-(parseFloat(input))).toString()
            }
            else if (value === "." && result) {
                exp = result + value
                setResult(exp)
            }
            //fresh calculation
            else {
                // console.log("hi",input)
                exp =input + value;
                if (result && checkOperator.value===".") setResult(exp)
            }

            //checking if two operators are together
            // if (['+', '-', '/', '*', '%','.'].includes(value)) setCheckOperator({isOperator:true,value:value});
           
        }
        setInput(exp);
        // console.log(value, checkOperator)
    }
    // console.log(typeof(round('4.578965',3)))
    // console.log(checkOperator)
    //when '=' is clicked
    const handleCalculation = () => {
        setCheckOperator(false)
    
        try {
            let res = evaluate(input);
            let roundedRes = (res === round(res,2) ? res : round(res,2))
            setResult(roundedRes);
            setInput(roundedRes.toString())

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
