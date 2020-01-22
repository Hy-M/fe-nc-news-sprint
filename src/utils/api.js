const axios = require('axios');

exports.fetchAllArticles = () => {
    return axios
    .get('https://nc-news-hym.herokuapp.com/api/articles')
    .then(({ data: { articles } }) => {
        return articles;
    })
}

exports.fetchSingleArticle = (article_id) => {
    return axios
    .get(`https://nc-news-hym.herokuapp.com/api/articles/${article_id}`)
    .then(({ data: { article } }) => {
        return article;
    })
}

exports.fetchComments = () => {
    return axios
    .get('https://nc-news-hym.herokuapp.com/api/articles/28/comments')
    .then(({ data: { comments } }) => {
        return comments;
    })
};

exports.fetchTopicRelatedArticles = (topic) => {
    return axios
    .get('https://nc-news-hym.herokuapp.com/api/articles', {
        params: {
            topic
        }
    })
    .then(({ data: { articles } }) => {
        return articles;
    })
}

exports.fetchSortedArticles = (sortColumn) => {
    return axios
    .get('https://nc-news-hym.herokuapp.com/api/articles', {
        params: {
            sort_by: sortColumn
        }
    })
    .then(({ data: { articles }}) => {
        return articles;
    })
}

exports.postComment = (article_id, comment) => {    
    return axios
    .post(`https://nc-news-hym.herokuapp.com/api/articles/${Number(article_id)}/comments`, comment)   
    .then(({ data: { comment }}) => {
        return comment;
    })
}



