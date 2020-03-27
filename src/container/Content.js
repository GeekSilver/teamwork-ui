import React, {Component} from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import Loader from 'react-loader-spinner';

import Article from './Article';
import Gif from './Gif';
import "../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const StyledContent = styled.div`
  @media (min-width: 768px){
    width: 65%;
  }
`;


class Content extends Component {

  constructor(props){
    super(props);
    // initialize component as unmounted
    this._isMounted = false;
    // state
    this.state = {
      feedPage:1,
      articlesPage: 1,
      gifsPage: 1,
      feed: [],
      articles: [],
      gifs: [],
      feedError: false,
      articlesError: false,
      gifsError: false,
      hasMoreFeed: true,
      isFeedLoading: false,
      hasMoreArticles: true,
      isArticlesLoading: false,
      hasMoreGifs: true,
      isGifsLoading: false,
    }
    // debounce fn to update state onscroll to bottom of screen
    window.onscroll = debounce(() => {
      // check if the page has scrolled to the bottom
      if( window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
        if(this.props.location.pathname === '/feed'){
          // cancel when there's an error, its loading or there's nothing to load
          if(this.state.feedError || this.state.isFeedLoading || this.state.hasMoreFeed === false) return;          
          this.fetchFeed();      
        }
        else if(this.props.location.pathname === '/articles'){
            // cancel when there's an error, its loading or there's nothing to load
            if(this.state.articlesError || this.state.isArticlesLoading || this.state.hasMoreArticles === false) return;  
            this.fetchArticles();     
        }
        else if(this.props.location.pathname === '/gifs'){
          // cancel when its loading or there's nothing to load
          if(this.state.gifsError || this.state.isGifsLoading || this.state.hasMoreGifs === false) return;            
          this.fetchGifs();
        }
      }
    }, 100);
  }

  fetchFeed = () => {
    this.setState({ isFeedLoading: true}, () => {
      // fetch feed
      fetch(`https://teamwork-rest-api.herokuapp.com/teamwork/v1/feed?page=${this.state.feedPage}`)
        .then(response => {
          this.setState((prevState) => ({
            ...prevState,
            feedPage: prevState.feedPage + 1,
          }))
          return response.json();
        })
        .then( response => {
          this.setState((prevState) => ({
            ...prevState,
            feed: [...prevState.feed,
              ...response.data]
          }))
          return response
        })
        .then((responseData) => {
          this.setState((prevState) => ({
            ...prevState,
            hasMoreFeed: (responseData.data.length > 0),
            isFeedLoading: false,
          }))
        })
        .catch((error) => {
          this.setState((prevState) => ({
            ...prevState,
            feedError: error,
            isFeedLoading: false,
          }))
        })    
    })
   
  }

  fetchArticles = () => {
    this.setState({ isArticlesLoading: true}, () => {
      // fetch feed
      fetch(`https://teamwork-rest-api.herokuapp.com/teamwork/v1/articles?page=${this.state.articlesPage}`)
        .then(response => {
          this.setState((prevState) => ({
            ...prevState,
            articlesPage: prevState.articlesPage + 1,
          }))
          return response.json();
        })
        .then( response => {
          this.setState((prevState) => ({
            ...prevState,
            articles: [...prevState.articles,
              ...response.data]
          }))
          return response
        })
        .then((responseData) => {
          this.setState((prevState) => ({
            ...prevState,
            hasMoreArticles: (responseData.data.length > 0),
            isArticlesLoading: false,
          }))
        })
        .catch((error) => {
          this.setState((prevState) => ({
            ...prevState,
            articlesError: error,
            isArticlesLoading: false,
          }))
        })    
    })
   
  }

  fetchGifs = () => {
    this.setState({ isGifsLoading: true}, () => {
      // fetch feed
      fetch(`https://teamwork-rest-api.herokuapp.com/teamwork/v1/gifs?page=${this.state.gifsPage}`)
        .then(response => {
          this.setState((prevState) => ({
            ...prevState,
            gifsPage: prevState.gifsPage + 1,
          }))
          return response.json();
        })
        .then( response => {
          this.setState((prevState) => ({
            ...prevState,
            gifs: [...prevState.gifs,
              ...response.data]
          }))
          return response
        })
        .then((responseData) => {
          this.setState((prevState) => ({
            ...prevState,
            hasMoreGifs: (responseData.data.length > 0),
            isGifsLoading: false,
          }))
        })
        .catch((error) => {
          this.setState((prevState) => ({
            ...prevState,
            gifsError: error,
            isGifsLoading: false,
          }))
        })    
    })
   
  }

  componentDidMount(){
    // mount component before updating state
    this._isMounted = true;
    // load initial content
    this.fetchFeed();
    this.fetchArticles();
    this.fetchGifs();
  }

  render() {
    return (
      <StyledContent
      className="float-md-left pt-md-4 pt-5 pb-5" 
      >
      <div className="container">
        {         
        this.props.location.pathname === '/feed' ?
          this.state.feed.map( article => {
            if(article.title !== null && article.title !== undefined){
              return <Article key={`feed-article-${article.id}`} article={article} />
            }
            return <Gif key={`feed-gif-${article.id}`} gif={article} url={article.url}/>      
      
          })          

          :
          this.props.location.pathname === '/gifs' ?
            this.state.gifs.map( article => {
              if(article.title !== null && article.title !== undefined){
                return '';
              }
              return <Gif key={`gif-${article.id}`} gif={article} url={article.url}/>      
        
            }) 

            :
            this.props.location.pathname === '/articles' ?
              this.state.articles.map( article => {
                if(article.title !== null && article.title !== undefined){
                  return <Article key={`article-${article.id}`} article={article} />
                }
                return '' ;    
          
              }) 
              
              :
              this.state.feed.map( article => {
                if(article.title !== null && article.title !== undefined){
                  return <Article key={`feed-catch-article-${article.id}`} article={article} />
                }
                return <Gif key={`feed-catch-gif-${article.id}`} gif={article} url={article.url}/>      
          
              })        
        } 
        {(this.props.location.pathname === '/feed') 
        && this.state.feedError ? 
        <div className="text-center">
          {this.state.feedError}
        </div>
        :
        (this.props.location.pathname === '/articles') 
        && this.state.articlesError ?
        <div className="text-center">
          {this.state.articlesError}
        </div>
        : 
        (this.props.location.pathname === '/gifs')
        &&
        this.state.gifsError ?
        <div className="text-center">
          {this.state.gifsError}
        </div>
        : ''
        }
        {(this.state.isFeedLoading || this.state.isArticlesLoading || this.state.isGifsLoading)
         && 
        <div className="text-center">
          <Loader type="TailSpin" color="Blue" height={80} width={80} />
        </div>
        }     
        {(this.props.location.pathname === '/feed') 
        && 
        !this.state.hasMoreFeed ?
          <div className="text-center font-weight-bold">
            End of Feed. <br/>
            Write an Article or post a Gif and let others know what you're upto.
          </div>
        :
        (this.props.location.pathname === '/articles')
        && 
        !this.state.hasMoreArticles ?
          <div className="text-center font-weight-bold">
            There are no more Articles. <br/>
            Let others hear from you by writing an article.
          </div>
        :
        (this.props.location.pathname === '/gifs')
        && 
        !this.state.hasMoreGifs ?
          <div className="text-center font-weight-bold">
            There are no more Gifs. <br/>
            Let others know what you're up to by uploading a gif.
          </div>
        : ''
        }  
      </div>
      </StyledContent>
    );
  }
};

export default Content;