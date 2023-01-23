import React from 'react'
import Question from './components/Question'
import Start from './components/Start'
import {nanoid} from 'nanoid'

export default function App() {
    const [allData, setAllData] = React.useState([])
    const [quiz, setQuiz] = React.useState(false)
    const map = new Map([['num', 0]]);
    const [allAnswers, setAllAnswers] = React.useState({})
    const checkAnswersArray = {5: false, 10: false, 15: false, 20: false, 25: false}
    const [gameOver, setGameOver] = React.useState(false)
    const [count, setCount] = React.useState(0);


    let btnGroup;
    let map1;

    const [correctAnswersArray, setCorrectAnswersArray] = React.useState({5: false, 10: false, 15: false, 25: false, 30: false})

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10')
            .then(res => res.json())
            .then(data => setAllData(data.results))
    }, [])

    function handleRadioButton(answ, correct_answer, group) {
        if(answ === correct_answer) {
            // console.log(true)
            checkAnswersArray[group] = true
        } else {
            checkAnswersArray[group] = false
            // console.log(false)
        }
        // console.log(group)
        console.log(checkAnswersArray)
    }

    let allQuestions;

    const questions = allData.slice(0, 5).map(question => {
        allQuestions = question.incorrect_answers
        allQuestions.push(question.correct_answer)
        if(allQuestions.length >= 5) {
            allQuestions.pop()
        }
        if(allQuestions.length === 3) {
            allQuestions.pop()
        }
        for(let i = 0; i < allQuestions.length; i++) {
            let tempCard = allQuestions[i];
            var randomIndex = Math.floor(Math.random() * allQuestions.length);
            allQuestions[i] = allQuestions[randomIndex];
            allQuestions[randomIndex] = tempCard;
        }

        map.set('num', map.get('num') + 5 || 5);
        map1 = new Map([['num', map.get('num')]]);

        const answers = allQuestions.map(
            answ => {
                map1.set('num', map1.get('num') + 1 || 1);
                const group = map.get('num').toString()
                return <div className='quest--one'>
                    <input
                        type="radio"
                        className='quest--radio-custom'
                        name={map.get('num').toString()}
                        value={map1.get('num').toString()}
                        id={map1.get('num').toString()}
                        onChange={() => handleRadioButton(answ, question.correct_answer, group)}
                    />
                    <label htmlFor={map1.get('num').toString()}>{answ}</label>
                </div>
            }
        )
        
        return <Question
            key={nanoid()}
            quest={question.question.replace('&quot;', "'").replace('&#039;', "'")} 
            allchoices={allQuestions}
            startNumber={map.get('num')}
            correct_answer={question.correct_answer}
            check_answers={() => checkAnswers}
            answers_array = {correctAnswersArray}
            answerIsCorrect = {false}
            answers={answers}
        />})

    function checkAnswers() {
        console.log(checkAnswersArray)
        setCount(0)
        for(let i = 5; i <= 25; i+=5) {
            if(checkAnswersArray[i] === true) {
                setCount(prevCount => prevCount + 1)
            }
        }
        setGameOver(true)
    }

    return (
        <div>
            {!quiz && <Start startQuiz={() => setQuiz(true)}/>}
            {quiz && questions}
            {quiz && <button onClick={checkAnswers} className='check-answers-btn'>{gameOver ? 'Play Again': 'Check answers'}</button>}
            {gameOver && <h3 className='final-score-text'>{`You have answered ${count} / 5 questions correctly!`}</h3>}
        </div>
    )
}