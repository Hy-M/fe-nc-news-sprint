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

exports.fetchComments = (article_id) => {
    return axios
    .get(`https://nc-news-hym.herokuapp.com/api/articles/${article_id}/comments`)
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

exports.deleteComment = (comment_id) => {
    return axios
    .delete(`https://nc-news-hym.herokuapp.com/api/comments/${comment_id}`);
}

exports.patchVotes = (article_id, vote) => {
    return axios
    .patch(`https://nc-news-hym.herokuapp.com/api/articles/${article_id}`, vote)
    .then(({ data: { article }}) => {
        return article;
    })
}

exports.patchCommentVotes = (comment_id, vote) => {
    return axios
    .patch(`https://nc-news-hym.herokuapp.com/api/comments/${comment_id}`, vote)
    .then(({ data: { comment }}) => {
        return comment
    })
}

