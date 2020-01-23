import React, { Component } from 'react';
import * as api from '../utils/api';


class Comments extends Component {
    state = {
        comments: [],
        commentBody: '',
        user: this.props.user,
        vote: 0
    }

    // Render all comments functionality
    componentDidMount() {
        this.getComments()
    }

    getComments = () => {
        api.fetchComments(this.props.article_id)
        .then(comments => {
            this.setState({comments: comments})
        })
    }

    // Post comment functionality
    handleChange = (commentBody, id) => {
        this.setState({ [id]: commentBody });
    }

    postNewComment = (article_id, comment) => {
        api.postComment(article_id, comment)
        .then((newComment) => {
            this.setState((currentState) => {
                return { comments: [newComment, ...currentState.comments]}
            })
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
        this.postNewComment(article_id, commentObj)
    }

    // Delete comment functionality
    handleClick = (clickEvent) => {
        let commentElementToDelete = clickEvent.target.parentElement.id;   
        let user = clickEvent.target.parentElement.firstChild.id
        
        if (user === this.state.user) {
            this.deleteComment(commentElementToDelete)
        } else {
            console.log("You can't delete someone elses comments");
        } 
    }

    deleteComment = (comment_id) => {
        api.deleteComment(comment_id)
        .then(() => {
            this.getComments();
        })
    }

    // Update votes functionality
    updateVotes = (comment_id, vote) => {
        api.patchCommentVotes(comment_id, vote)
        .then((updatedComment) => {
            this.setState({vote: updatedComment.votes})
        })
    }

    handleVoteClick = (clickEvent) => {
        let commentId = clickEvent.target.parentElement.id;
        let buttonId = clickEvent.target.id;
        let vote = {
            inc_votes: 0
        }

        if (buttonId === "upvote") {
            vote.inc_votes = 1;

            this.updateVotes(commentId, vote);
            this.setState((currentState) => {
                return {vote: currentState.vote + vote.inc_votes}
            })
        } else {
            vote.inc_votes = -1;
            
            this.updateVotes(commentId, vote);
            this.setState((currentState) => {
                return {vote: currentState.vote + vote.inc_votes}
            })
        }
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
                        <li key={comment.comment_id} id={comment.comment_id}>
                            <p id={comment.author}>{comment.author} said:</p>
                            <p>{comment.body}</p>
                            <p>at {comment.created_at}</p>
                            <p>Votes: {this.state.vote}</p>
                            <button id="upvote" onClick={this.handleVoteClick}>Upvote</button>
                            <button id="downvote" onClick={this.handleVoteClick}>Downvote</button>
                            <button onClick={this.handleClick}>Delete comment</button>
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