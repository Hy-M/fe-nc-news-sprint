import React, {Component} from 'react';
import './App.css';
import { Router, Link } from '@reach/router';
import Title from './components/Title';
import Navigation from './components/Navigation';
import ArticleList from './components/ArticleList';
import SingleArticle from './components/SingleArticle';

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
         </Router>
      </div>
    )
  }
}

export default App;
