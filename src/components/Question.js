import React from 'react'

export default function Question(props) {
    const answers = props.allchoices.map(answ => <button className='quest--choice-button'>{answ}</button>)
    return(
        <div className='quest--div'>
            <div className='quest--blob-one'></div>
            <div className='quest--blob-two'></div>
            <h1 className='quest--title'>{props.quest}</h1>
            {answers}
            <hr></hr>
        </div>
    )
}