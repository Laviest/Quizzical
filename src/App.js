import React from 'react'
import Question from './components/Question'
import Start from './components/Start'
import {nanoid} from 'nanoid'

export default function App() {

    // fix question to show on other screen

    const [allData, setAllData] = React.useState([])
    const [quiz, setQuiz] = React.useState(false)

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10')
            .then(res => res.json())
            .then(data => setAllData(data.results))
    }, [])

    console.log(allData)
    let allQuestions;

    const questions = allData.slice(0, 5).map(question => {
        allQuestions = question.incorrect_answers
        allQuestions.push(question.correct_answer)
        for(let i = 0; i < allQuestions.length; i++) {
            let tempCard = allQuestions[i];
            var randomIndex = Math.floor(Math.random() * allQuestions.length);
            allQuestions[i] = allQuestions[randomIndex];
            allQuestions[randomIndex] = tempCard;
        }
        return <Question
        key={nanoid()}
        quest={question.question.replace('&quot;', "'").replace('&#039;', '')} 
        allchoices={allQuestions}
        choices={question.incorrect_answers}
        correct={question.correct_answer}
        />})

    

    return (
        <div>
            {!quiz && <Start startQuiz={() => setQuiz(true)}/>}
            {quiz && questions}

        </div>
    )
}