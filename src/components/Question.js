import React from 'react'

export default function Question(props) {
    const map1 = new Map([['num', props.startNumber]]);
    const array = {5: false, 10: false, 15: false, 25: false, 30: false}
    const btnGroup = props.startNumber;
    const checkedAnswersMap = new Map([])
    const correct_answer = props.correct_answer

    const handleRadioButton = (answer) => {
        if(answer === correct_answer) {
            props.answerIsCorrect = true
            array[Number(btnGroup)] = true
        } else {
            props.answerIsCorrect = false
            array[Number(btnGroup)] = false
        }
    }

    function checkAnswers() {
    }
    
    return(
        <div className='quest--div'>
            <div className='quest--blob-one'></div>
            <div className='quest--blob-two'></div>
            <h1 className='quest--title'>{props.quest}</h1>
            <div className='quest--answers-div'>
            {props.answers}
            </div>
            <div className='hr'>
            <hr></hr>
            </div>
        </div>
    )
}
