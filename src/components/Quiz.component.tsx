import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

interface RouteParams {
    type: string;
}


const Quiz: React.FC<RouteComponentProps<RouteParams>> = (props) => {

    useEffect(() => {
        const type = props.match.params.type;
        console.log(type);
    });

    return <h1>Hello</h1>;
};

export default Quiz;