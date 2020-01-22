import React, { Component } from 'react';
import * as api from '../utils/api';
import { Link } from '@reach/router';

class ArticleList extends Component {
    state = {
        articles: []
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

    getSortedArticles = (sortColumn) => {
        api.fetchSortedArticles(sortColumn)
        .then(sortedArticles => {
            this.setState({ articles: sortedArticles })
        })
    }

    componentDidMount() {
        this.getAllArticles();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topic !== this.props.topic) {
            this.getTopicRelatedArticles()
        }
    }

    handleChange = (changeEvent) => {
        let selectedValue = changeEvent.target.value;

        if (selectedValue === 'sortByCommentCount') {
            this.getSortedArticles('comment_count')
        } else if (selectedValue === 'sortByVotes') {
            this.getSortedArticles('votes');
        } else {
            this.getAllArticles();
        }
    }

    render() {
        const { articles } = this.state;
        return (
            <main>
                <select onChange={this.handleChange}>
                    <option defaultValue="sortByDate">Sort by date created (most recent)</option>
                    <option value="sortByCommentCount">Sort by comments (most to least)</option>
                    <option value="sortByVotes">Sort by votes (most to least)</option>
                </select>
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