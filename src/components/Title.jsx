import React from 'react';
import { Link } from '@reach/router';

const Title = () => {
    return (
        <header>
            <h1>
                <Link to='/'>
                    NC NEWS 
                </Link></h1>
        </header>
    );
};

export default Title;