import React, { Component } from 'react';
import * as api from '../utils/api';
import Comments from './Comments';
import { Router, Link } from '@reach/router';

class SingleArticle extends Component {
    state = {
        user: this.props.user,
        singleArticle: {},
        hasVoted: false,
        vote: 0
    }

    componentDidMount() {
      this.getArticle()  
    }

    getArticle = () => {
        api.fetchSingleArticle(this.props.article_id)
        .then((article) => {
            this.setState({singleArticle: article, vote: article.votes});
        })
    }

    updateVotes = (article_id, vote) => {
        api.patchVotes(article_id, vote)
        .then((updatedArticle) => {
            this.setState({vote: updatedArticle.votes})
        })
    }

    handleClick = (buttonId) => {
        let vote = {
            inc_votes: 0
        }

        if (buttonId === "upvote") {
            vote.inc_votes = 1;

            this.updateVotes(this.props.article_id, vote);
            this.setState((currentState) => {
                return {vote: currentState.vote + vote.inc_votes}
            })
        } else {
            vote.inc_votes = -1
            
            this.updateVotes(this.props.article_id, vote);
            this.setState((currentState) => {
                return {vote: currentState.vote + vote.inc_votes}
            })
        }
    }
    
    render() {
        const { title, body, topic, comment_count, created_at, author } = this.state.singleArticle;
        const { article_id } = this.props;
        return (
            <main>
                <h3>{title}</h3>
                <h6>Written by: {author} on {created_at}</h6>
                <p>Topic: {topic}</p>
                <p>{body}</p>
                <p>Votes: {this.state.vote}</p>
                <button id="upvote" onClick={(clickEvent) => this.handleClick(clickEvent.target.id)}>Upvote</button>
                <button id="downvote" onClick={(clickEvent) => this.handleClick(clickEvent.target.id)}>Downvote</button>
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