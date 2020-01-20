import React, { Component } from 'react';
import { Link } from '@reach/router';

class Navigation extends Component {
    render() {
        return (
            <>
            <Link to="/articles">Articles</Link>
            </>
        );
    }
}

export default Navigation;