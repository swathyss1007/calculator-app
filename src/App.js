import React from "react"

export default function App(){

    const [output,setOutput] = React.useState("")

    function handleNumber(event){
        setOutput(output+event.target.value)
    }

    function handleClear(){
        setOutput("")
    }

    function handleBackSpace(){
        setOutput(output.slice(0,output.length-1))
    }

    function handlecalculate(){

        let outputCopy = output  // take backup of the state

        const operators = ["/","*","+","-"]
        let opLoc = -1      // operator location

        let operatorFound = true

        // Run this loop until no operators found (ie. operatorFound = false)
        while(operatorFound){

            operatorFound = false
            let result

            for (const i of operators) {

                // console.log("outPutCopy = ", outputCopy)

                //  proceed only if outPutCopy contains a operator
                if (outputCopy.includes(i)) {
                    
                    opLoc=outputCopy.indexOf(i);    //  get operator location

                    //  when there is negative sign in 0th position
                    if(opLoc === 0){
                        let temp  = outputCopy.slice(1)
                        if(temp.includes(i)){           // change opLoc to next operator if present
                            opLoc = temp.indexOf(i)+1
                        }
                    }

                    // Find StartIndex for firstNum
                    let count = 0
                    for(let i=opLoc-1; i>=0; i--){
                        let ch = outputCopy.charAt(i)
                        if(operators.indexOf(ch) === -1){
                            count++
                        }
                        else{
                            if(i===0){       //   when there is negative sign in 0th position                     
                                count++
                            }
                            break
                        }
                    }
                    let startIndex = opLoc-count

                    // Find endIndex for secNum
                    let count1 = 0
                    for(let i = opLoc+1; i<outputCopy.length; i++){
                        let ch = outputCopy.charAt(i)
                        if(operators.indexOf(ch) === -1){
                            count1++
                        }
                        else{
                            break
                        }           
                    }
                    let endIndex = opLoc+count1+1

                    // get firstNum and secNum string
                    let firstNum = outputCopy.slice(startIndex, opLoc)
                    let secNum = outputCopy.slice(opLoc+1, endIndex)

                    let frstNumLen  = firstNum.length
                    let secNumLen = secNum.length

                    // console.log("firstNum = ", firstNum)
                    // console.log("secNum = ", secNum)

                    // convert firstNum and secNum into float
                    firstNum = parseFloat(firstNum)
                    secNum = parseFloat(secNum)

                    if(isNaN(firstNum)) break   // to handle negative results (eg.-5)

                    // console.log("firstNumLen = ", frstNumLen)
                    // console.log("secNumLen = ", secNumLen)

                    if(outputCopy.includes("/")){
                        result = firstNum/secNum 
                    }
                    else if(outputCopy.includes("*")){
                        result = firstNum*secNum
                    }
                    else if(outputCopy.includes("+")){
                        result = firstNum+secNum
                    }
                    else if(outputCopy.includes("-")){
                        result = firstNum-secNum
                    }

                    // Replacing completed operation with result
                    outputCopy = outputCopy.replace(outputCopy.slice(startIndex, startIndex+frstNumLen+secNumLen+1), result.toString());
                    operatorFound = true;
                    break;
                }
            }   
        }

        setOutput(outputCopy)
    
    }

    return(
        <div className="div">
            <h3>CALCULATOR MODEL</h3>
            <div className="main-div">
                <div className="display">{output}</div>
                <div className="row">
                    <button className="button" value = "7" onClick={handleNumber}>7</button>
                    <button className="button" value = "8" onClick={handleNumber}>8</button>
                    <button className="button" value = "9" onClick={handleNumber}>9</button>
                    <button className="operator-button" value="/" onClick={handleNumber}>/</button>
                </div>
                <div className="row">
                    <button className="button" value = "4" onClick={handleNumber}>4</button>
                    <button className="button" value = "5" onClick={handleNumber}>5</button>
                    <button className="button" value = "6" onClick={handleNumber}>6</button>
                    <button className="operator-button" value="*" onClick={handleNumber}>*</button>
                </div>
                <div className="row">
                    <button className="button" value = "1" onClick={handleNumber}>1</button>
                    <button className="button" value = "2" onClick={handleNumber}>2</button>
                    <button className="button" value = "3" onClick={handleNumber}>3</button>
                    <button className="operator-button" value="-" onClick={handleNumber}>-</button>
                </div>
                <div className="row">
                    <button className="button" value= "." onClick={handleNumber}>.</button>
                    <button className="button"  value = "0" onClick={handleNumber}>0</button>
                    <button className="button" onClick={handlecalculate}>=</button>
                    <button className="operator-button" value="+" onClick={handleNumber}>+</button>
                </div>
                <div className="row">
                    <button className="clear-button" onClick={handleClear}>CLEAR</button>
                    <button className="backSpace-button" onClick={handleBackSpace}>X</button>
                </div>

            </div>
        </div>
 
    )
}