import React, { Component } from 'react';
import * as api from '../utils/api';
import { Link } from '@reach/router';

class ArticleList extends Component {
    state = {
        articles: []
    }

    componentDidMount() {
        api.fetchAllArticles()
        .then(articles => {
            this.setState({articles: articles})
        })
    }
    

    render() {
        const { articles } = this.state;
        return (
            <main>
                <ol>
                {
                    articles.map((article) => {                        
                        return (
                            <li key={article.article_id}>
                                <Link to={(article.article_id).toString()}>
                                    {article.title}
                                </Link>
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