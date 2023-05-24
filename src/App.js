import React from 'react'
import Question from './components/Question'
import Start from './components/Start'
import {nanoid} from 'nanoid'

export default function App() {
    const [allData, setAllData] = React.useState([])
    const [quiz, setQuiz] = React.useState(false)
    const map = new Map([['num', 0]]);
    let checkAnswersArray = {5: false, 10: false, 15: false, 20: false, 25: false}
    let colorToBeFilled = {5: 'yellow', 10: 'yellow', 15: 'yellow', 20: 'yellow', 25: 'yellow'}
    const [answersValues, setAnswerValues] = React.useState({5: '', 10: '', 15: '', 20: '', 25: ''})
    const [gameOver, setGameOver] = React.useState(false)
    const [count, setCount] = React.useState(0);
    let map1;
    const [playAgain, setPlayAgain] = React.useState(false)

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => setAllData(data.results))
        setPlayAgain(false)
    }, [playAgain])

    function handleRadioButton(event, answ, correct_answer, group) {
        if(event.target.value === correct_answer) {
            colorToBeFilled[group] = 'green'
            answersValues[group] = event.target.value.toString()
            checkAnswersArray[group] = true
        } else {
            colorToBeFilled[group] = 'yellow'
            answersValues[group] = event.target.value.toString()
            checkAnswersArray[group] = false
        }
    }

    let allQuestions;

    const questions = allData.map(question => {
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
                const group = map.get('num').toString()
                map1.set('num', map1.get('num') + 1 || 1);
                let answered = false;
                function changeWrongColor() {
                    if(gameOver) {
                        if(answ !== question.correct_answer && answersValues[group] === answ) {
                            answered = true;
                            return true;
                        } else {
                            return false
                        }
                    }
                }
                function changeCorrectColor() {
                    if(gameOver) {
                        if(answ === question.correct_answer) {
                            return true
                        } else {
                            return false
                        }
                    }
                }
                return <div className='quest--one'>
                    <input
                        type="radio"
                        className='quest--radio-custom'
                        name={map.get('num').toString()}
                        value={answ}
                        id={map1.get('num').toString()}
                        onChange={(e) => handleRadioButton(e, answ, question.correct_answer, group)}
                    />
                    {changeWrongColor()  && <label className='label--gameOver-wrong' htmlFor={map1.get('num').toString()}>{answ}</label>}
                    {changeCorrectColor() && <label className='label--gameOver-correct' htmlFor={map1.get('num').toString()}>{answ}</label>}
                
                    {!changeCorrectColor() && !answered && <label className='label' htmlFor={map1.get('num').toString()}>{answ}</label>}
                </div>
            }
        )

        return <Question
            key={nanoid()}
            quest={question.question.replace('&quot;', "'").replace('&#039;', "'")} 
            answers={answers}
        />})

    function checkAnswers() {
        setCount(0)
        for(let i = 5; i <= 25; i+=5) {
            if(checkAnswersArray[i] === true) {
                setCount(prevCount => prevCount + 1)
            }

        }
        
        setGameOver(true)
    }

    function funcPlayAgain() {
        setPlayAgain(true)
        setAnswerValues({5: '', 10: '', 15: '', 20: '', 25: ''})
        colorToBeFilled = {5: 'yellow', 10: 'yellow', 15: 'yellow', 20: 'yellow', 25: 'yellow'}
        map.set('num', 0)
        checkAnswersArray = {5: false, 10: false, 15: false, 20: false, 25: false}
        setCount(0)
        setGameOver(false)
    }

    const gameOverButtonStyle = {
        marginLeft: '980px'
    }


    return (
        <div>
            {!quiz && <Start startQuiz={() => setQuiz(true)}/>}
            {quiz && questions}
            {quiz && <button onClick={gameOver ? funcPlayAgain : checkAnswers} style={gameOver ? gameOverButtonStyle : null} className='check-answers-btn'>{gameOver ? 'Play Again': 'Check answers'}</button>}
            {gameOver && <h2 className='final-score-text'>{`You have answered ${count} / 5 questions correctly!`}</h2>}
        </div>
    )
}