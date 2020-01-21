import React, { Component } from 'react';
import { fetchSingleArticle } from '../utils/api';
import Comments from './Comments';
import { Router, Link } from '@reach/router';

class SingleArticle extends Component {
    state = {
        singleArticle: {}
    }

    componentDidMount() {
      this.getArticle()  
    }

    getArticle = () => {
        fetchSingleArticle(this.props.article_id)
        .then((article) => {
            this.setState({singleArticle: article});
        })
    }
    
    render() {
        const { title, body, topic, votes, comment_count, created_at, author } = this.state.singleArticle;
        const { article_id } = this.props;
        return (
            <main>
                <h3>{title}</h3>
                <h6>Written by: {author} on {created_at}</h6>
                <p>Topic: {topic}</p>
                <p>{body}</p>
                <p>Votes: {votes}</p>
                <p>Comment count: {comment_count}</p>
                <Link to={`/article/${article_id}/comments`}>View comments</Link>
                <Router>
                    <Comments path={`/comments`}/>
                </Router>
            </main>
        );
    }
}

export default SingleArticle;