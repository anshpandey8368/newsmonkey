import React, { Component } from 'react';
import './Card.css';
import defaultImage from '../images/defaultImage.png';

export class Card extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }

  async componentDidMount() {
    try {
      let url = 'https://newsapi.org/v2/everything?q=tesla&from=2024-06-29&sortBy=publishedAt&apiKey=5a20c21ab14a418bacef98a24874b8aa&pageSize=18';
      this.setState({ loading:true });
      let response = await fetch(url);
      let data = await response.json();
      this.setState({ articles: data.articles });
    } catch (error) {
      console.log(error);
    }
  }


  nextHandler = async () => {
    try {
      let url = `https://newsapi.org/v2/everything?q=tesla&from=2024-06-29&sortBy=publishedAt&apiKey=5a20c21ab14a418bacef98a24874b8aa&page=${this.state.page + 1}&pageSize=18`;
      this.setState({ loading:true });
      let response = await fetch(url);
      let data = await response.json();
      this.setState({ 
        page: this.state.page + 1,
        articles: data.articles
       });
    } catch (error) {
      console.log(error);
    }
  }

  PrevHanlder = async () => {
    try {
      let url = `https://newsapi.org/v2/everything?q=tesla&from=2024-06-29&sortBy=publishedAt&apiKey=5a20c21ab14a418bacef98a24874b8aa&page=${this.state.page - 1}&pageSize=18`;
      this.setState({ loading:true });
      let response = await fetch(url);
      let data = await response.json();
      this.setState({ 
        page: this.state.page - 1,
        articles: data.articles
       });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { articles, page, loading} = this.state;

    return (
      <>
      <h1 className='heading'>NewsMonkey - Top Headlines</h1>
      <div className='cardCont'>
        {articles && articles.length > 0 ? (
           articles.map((article, index) => (
            <div key={index} className="card" style={{ width: "18rem", marginBottom: "10px" }}>

              <img src={article.urlToImage ? article.urlToImage : defaultImage} 
              className="card-img-top" alt={article.title || 'News image'} />

              <div className="card-body">
                <p className="card-text">
                  {article.title.length > 100 ? article.title.substring(0, 100) + '...' : article.title}
                </p>
                <a href={article.url} className="btn btn-dark">Read More</a>
              </div>
            </div>
          ))
          ) : (

          <div className="spinner"></div>
        )}
      </div>
      <button type="button"disabled={page <= 1} className="btn btn-dark" id='prev' onClick={this.PrevHanlder}> &larr; Prev </button>
      <button type="button" className="btn btn-dark" id='next' onClick={this.nextHandler}> Next &rarr;</button>
  
      </>
    );
  }
}

export default Card;
