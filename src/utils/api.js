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
