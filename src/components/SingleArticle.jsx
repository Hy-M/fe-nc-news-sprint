import React, { Component } from 'react';
import { fetchSingleArticle } from '../utils/api';
// import { Router, Link } from '@reach/router';

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

    // componentDidUpdate(prevProps, prevState) {
    //     console.log(this.props);
    //     if (prevProps.singleArticle.topic !== this.props.topic) {
    //         this.getArticle();
    //     }
    // }
    
    render() {
        const { title, body, topic, votes, comment_count, created_at, author } = this.state.singleArticle;
        
        return (
            <main>
                <h3>{title}</h3>
                <h6>Written by: {author} on {created_at}</h6>
                <p>Topic: {topic}
                    {/* <Link to={topic}>
                        
                    </Link> */}
                </p>
                <p>{body}</p>
                <p>Votes: {votes}</p>
                <p>Comments: {comment_count}</p>
            </main>
        );
    }
}

export default SingleArticle;