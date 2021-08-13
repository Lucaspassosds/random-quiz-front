import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { Question } from '../models/interfaces';
import { apiUrl } from './Menu.component';

interface RouteParams {
    type: string;
}

const Quiz: React.FC<RouteComponentProps<RouteParams>> = (props) => {
    
    const history = useHistory();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    
    useEffect(() => {
        console.log('test');
        const type = props.match.params.type;
        const typeId = sessionStorage.getItem(type);
        if(!typeId){
            return history.push('/');
        }
        async function fetchQuestions(){
            const res = await axios.get(`${apiUrl}/types/find/${typeId}`);
            const questions: Question[] = res.data;
            setQuestions(questions);
        }
        fetchQuestions();
    }, [props.match.params.type, history]);

    return (
        <div className="container mx-auto">
            <form>
                <label className="text-4xl text-yellow-100">{questions[currentQuestion]?.content}</label>
                <div className="flex flex-row mt-10">
                    <input
                        className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="answer"
                        placeholder="Your answer here..."
                    />
                    <input
                        type="submit"
                        value="Answer!"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    />
                </div>
            </form>
        </div>
    );
};

export default Quiz;
