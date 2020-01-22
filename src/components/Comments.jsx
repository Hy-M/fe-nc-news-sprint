import React, { Component } from 'react';
import * as api from '../utils/api';


class Comments extends Component {
    state = {
        comments: [],
        commentBody: '',
        user: this.props.user
    }

    componentDidMount() {
        this.getComments()
    }

    getComments = () => {
        api.fetchComments()
        .then(comments => {
            this.setState({comments: comments})
        })
    }

    handleChange = (commentBody, id) => {
        this.setState({ [id]: commentBody });
    }

    getNewComment = (article_id, comment) => {
        api.postComment(article_id, comment)
        .then((newComment) => {
            this.displayNewComment(newComment)
        })
    }

    handleSubmit = (submitEvent) => {
        submitEvent.preventDefault();
        const { commentBody, user} = this.state;
        const { article_id } = this.props;

        let commentObj = {
            username: user,
            body: commentBody
        }

        submitEvent.target.firstChild.value = "";
        this.getNewComment(article_id, commentObj)
    }

    displayNewComment = (newComment) => {
        this.setState((currentState) => {
            return { comments: [newComment, ...currentState.comments]}
        })
    }
    
    render() {
        const { comments } = this.state;
        return (
            <main>
                <h4>Comments:</h4>
            <ol>
            {
                comments.map((comment) => {                                                
                    return (
                        <li key={comment.comment_id}>
                            <p>{comment.author} said:</p>
                            <p>{comment.body}</p>
                            <p>at {comment.created_at}</p>
                        </li>
                    )
                })
            }
            </ol>
            <h4>Post a comment:</h4>
            <form onSubmit={this.handleSubmit}>
                <input type='text' id='commentBody' onChange={(changeEvent) => this.handleChange(changeEvent.target.value, 'commentBody')} required></input>
                <button>Post!</button>
            </form>
        </main>
        );
    }
}

export default Comments;