import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Menu: React.FC = () => {

    const [quizTypes, setQuizTypes] = useState<string[]>([]);
    useEffect(() => {
        // async function fetchQuiz() {
        //     const res = await axios.get('localhost:3030');
        //     console.log(res);

        // }
        // fetchQuiz();
        setQuizTypes(['Geral', 'Futebol', 'Games']);
    }, []);

    const listQuizTypes = () => quizTypes.map(type => <a href={'/quiz/' + type} className="btn btn-blue">{type}</a>);

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