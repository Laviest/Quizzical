import React from 'react'
import Question from './components/Question'
import Start from './components/Start'
import {nanoid} from 'nanoid'

export default function App() {
    const [allData, setAllData] = React.useState([])
    const [quiz, setQuiz] = React.useState(false)
    const map = new Map([['num', 0]]);
    const [correctAnswersArray, setCorrectAnswersArray] = React.useState({5: false, 10: false, 15: false, 25: false, 30: false})

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10')
            .then(res => res.json())
            .then(data => setAllData(data.results))
    }, [])

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
        return <Question
            key={nanoid()}
            quest={question.question.replace('&quot;', "'").replace('&#039;', "'")} 
            allchoices={allQuestions}
            startNumber={map.get('num')}
            correct_answer={question.correct_answer}
            check_answers={() => checkAnswers}
            answers_array = {correctAnswersArray}
            answerIsCorrect = {false}
        />})

    React.useEffect(() => {
        // console.log(questions)

        // console.log(answers[0].props.children[0].props)
    }, [])

    const checkAnswers = () => {
        questions.map(question => {
            console.log(question)
        })
    }

    return (
        <div>
            {!quiz && <Start startQuiz={() => setQuiz(true)}/>}
            {quiz && questions}
            {quiz && <button onClick={checkAnswers} className='check-answers-btn'>Check answers</button>}
        </div>
    )
}