import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { Answer, Question } from '../models/interfaces';
import { apiUrl } from './Menu.component';

interface RouteParams {
    type: string;
}

const Quiz: React.FC<RouteComponentProps<RouteParams>> = (props) => {
    const history = useHistory();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question>(
        questions[currentQuestionIndex]
    );
    const [inputAnswer, setInputAnswer] = useState('');

    useEffect(() => {
        const type = props.match.params.type;
        const typeId = sessionStorage.getItem(type);
        if (!typeId) {
            return history.push('/');
        }
        async function fetchQuestions() {
            const res = await axios.get(`${apiUrl}/types/find/${typeId}`);
            const questions: Question[] = res.data;
            questions.forEach(async (question, i) => {
                const res = await axios.get(
                    `${apiUrl}/questions/${question.id}/answers`
                );
                const answers: Answer[] = res.data;
                questions[i].answers = answers;
            });
            setQuestions(questions);
            setCurrentQuestion(questions[currentQuestionIndex]);
            console.log(questions);
        }
        fetchQuestions();
    }, [props.match.params.type, history, currentQuestionIndex]);

    const onChangeInputAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputAnswer(e.target.value);
    };

    const onQuestionAnswered = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        console.log({
            currentQuestion,
            currentQuestionIndex,
            inputAnswer,
        });
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentQuestion(questions[currentQuestionIndex]);
        const answer = {
            content: inputAnswer,
            questionId: currentQuestion.id,
        };
        axios.post(`${apiUrl}/answers`, answer);
        setInputAnswer('');
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={onQuestionAnswered}>
                <label className="text-4xl text-yellow-100">
                    {questions[currentQuestionIndex]?.content}
                </label>
                <div className="flex flex-row mt-10">
                    <input
                        onChange={onChangeInputAnswer}
                        className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={inputAnswer}
                        name="answer"
                        placeholder="Your answer here..."
                    />
                    <input
                        type="submit"
                        value="Answer!"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                    />
                </div>
            </form>
        </div>
    );
};

export default Quiz;
