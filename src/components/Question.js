import React from 'react'

export default function Question(props) {

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