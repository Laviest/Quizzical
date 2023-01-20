import React from 'react'

export default function Quiz(props) {

    return (
        <div className='main--div'>
            <div className='blob-one'></div>
            <div className='blob-two'></div>
            <h1 className='title'>Quizzical</h1>
            <h5 className='desc'>A General Knowledge Quiz</h5>
            <button className='startButton' onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}