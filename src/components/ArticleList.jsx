import React, { Component } from 'react';
import * as api from '../utils/api';
import { Link } from '@reach/router';

class ArticleList extends Component {
    state = {
        articles: []
    }

    componentDidMount() {
       this.getAllArticles();
    }

    getAllArticles = () => {
        api.fetchAllArticles()
        .then(articles => {
            this.setState({articles: articles})
        })
    }

    getTopicRelatedArticles = () => {
        api.fetchTopicRelatedArticles(this.props.topic)
        .then(topicRelatedArticles => {
            this.setState({ articles: topicRelatedArticles })
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topic !== this.props.topic) {
            this.getTopicRelatedArticles()
        }
    }
    

    render() {
        const { articles } = this.state;
        return (
            <main>
                {this.props.topic ? <h3>Articles related to {this.props.topic}</h3> : <h3>Showing all articles</h3>}
                <ol>
                {
                    articles.map((article) => {                                                
                        return (
                            <li key={article.article_id}>
                                <Link to={`/article/${article.article_id.toString()}`}>
                                    {article.title}
                                </Link>
                                <p>Topic:  
                                    <Link to={`/articles/${article.topic}`}>
                                     {article.topic}
                                </Link>
                                </p>
                            </li>
                        )
                    })
                }
                </ol>
            </main>
        );
    }
}

export default ArticleList;