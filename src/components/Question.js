import React from 'react'

export default function Question(props) {
    const map1 = new Map([['num', props.startNumber]]);
    const array = {5: false, 10: false, 15: false, 25: false, 30: false}
    const btnGroup = props.startNumber;
    const checkedAnswersMap = new Map([])
    const correct_answer = props.correct_answer

    const handleRadioButton = (answer) => {
        // if(answer === correct_answer) {
        //     checkedAnswersMap.set(btnGroup, true)
        // } else {
        //     checkedAnswersMap.set(btnGroup, false)
        // }
        if(answer === correct_answer) {
            props.answerIsCorrect = true
            array[Number(btnGroup)] = true
            // checkedAnswersMap.set(btnGroup, true)
        } else {
            props.answerIsCorrect = false
            array[Number(btnGroup)] = false
            // checkedAnswersMap.set(btnGroup, false)
        }
        // console.log(array)
    }

    function checkAnswers() {
        // console.log(checkedAnswersMap)
    }

    const answers = props.allchoices.map(
        answ => {
            map1.set('num', map1.get('num') + 1 || 1);
            return <div className='quest--one'>
                <input
                    type="radio"
                    className='quest--radio-custom'
                    name={btnGroup.toString()}
                    value={map1.get('num').toString()}
                    id={map1.get('num').toString()}
                    onChange={() => handleRadioButton(answ)}
                />
                <label htmlFor={map1.get('num').toString()}>{answ}</label>
            </div>
        }
    )

    // React.useEffect(() => {
    //     console.log(answers[0].props.children[0].props)
    // }, answers)

    
    return(
        <div className='quest--div'>
            <div className='quest--blob-one'></div>
            <div className='quest--blob-two'></div>
            <h1 className='quest--title'>{props.quest}</h1>
            <div className='quest--answers-div'>
            {answers}
            </div>
            <div className='hr'>
            <hr></hr>
            </div>
        </div>
    )
}