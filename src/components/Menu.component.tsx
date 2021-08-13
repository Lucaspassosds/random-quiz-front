import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QuestionType } from '../models/interfaces';

export const apiUrl = 'http://localhost:3030';

const Menu: React.FC = () => {

    const [quizTypes, setQuizTypes] = useState<QuestionType[]>([]);
    
    //check if user entered main screen
    const [isAuthorized, userHasBeenAuthorized] = useState(false);

    useEffect(() => {
        userHasBeenAuthorized(true);
        async function fetchQuizTypes() {
            const res = await axios.get(`${apiUrl}/types`);
            const quizTypes: QuestionType[] = res.data;
            setQuizTypes(quizTypes);
            quizTypes.forEach(type => sessionStorage.setItem(type.name, type.id.toString()))
        }
        fetchQuizTypes();
    }, []);

    const listQuizTypes = () => quizTypes.map(type => <Link to={isAuthorized? '/quiz/' + type.name : '/'} className="btn btn-blue">{type.name}</Link>);

    return (
        <div className="max-w-sm mx-auto bg-yellow-300 p-2 rounded-lg border-2 border-yellow-800">
            <div className="flex-auto">
                <h2>Bem vindo ao Quiz! Escolha um tema:</h2>
                <div className="flex flex-col divide-y divide-light-yellow-300">
                    {listQuizTypes()}
                </div>
            </div>
        </div>
    );
}

export default Menu;