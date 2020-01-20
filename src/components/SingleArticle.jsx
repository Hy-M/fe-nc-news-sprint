import React, { Component } from 'react';
import { fetchSingleArticle } from '../utils/api';
import { create } from 'istanbul-reports';

class SingleArticle extends Component {
    state = {
        singleArticle: {}
    }

    componentDidMount() {
        fetchSingleArticle(this.props.article_id)
        .then((article) => {
            console.log(article)
            this.setState({singleArticle: article});
        })
    }
    
    render() {
        const { title, body, topics, votes, comment_count, created_at, author } = this.state.singleArticle;
        return (
            <main>
                <h3>{title}</h3>
                <h6>Written by: {author} on {created_at}</h6>
            </main>
        );
    }
}

export default SingleArticle;