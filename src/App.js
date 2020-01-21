import React, {Component} from 'react';
import './App.css';
import { Router } from '@reach/router';
import Title from './components/Title';
import Navigation from './components/Navigation';
import ArticleList from './components/ArticleList';
import SingleArticle from './components/SingleArticle';
import Comments from './components/Comments';

class App extends Component {
  state = {
    username: null
  }

  render() {
    return (
      <div className="App">
        <Title />
          <nav>
            <Navigation />
          </nav>
         <Router>
            <ArticleList path="/articles" />
            <SingleArticle path="/articles/:article_id"/>
            {/* <SingleArticle path="/articles/:topic"/> */}
            <Comments path="/articles/:article_id/comments"/>
         </Router>
      </div>
    )
  }
}

export default App;
