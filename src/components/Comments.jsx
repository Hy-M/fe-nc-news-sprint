import React, { Component } from 'react';
import * as api from '../utils/api';

class Comments extends Component {
    state = {
        comments: []
    }

    componentDidMount() {
        api.fetchComments()
        .then(comments => {
            this.setState({comments: comments})
        })
    }
    
    render() {
        const { comments } = this.state;
        
        return (
            <main>
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
        </main>
        );
    }
}

export default Comments;