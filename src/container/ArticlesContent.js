import React, { useReducer, useRef }  from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { useFetch, useInfiniteScroll } from '../customHooks';
import Article from './Article';
import "../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const StyledContent = styled.div`
  @media (min-width: 768px){
    width: 65%;
  }
`;

function Content(){

    const dataReducer = (state, action) => {
      switch (action.type) {
        case 'ADD_DATA':
          return {...state, data: state.data.concat(action.data)};

        case 'FETCHING_DATA':
          return {...state, fetching: action.fetching}

        case 'ERROR':
          return {...state, error: action.error}

        case 'END_OF_DATA':
          return {...state, hasMoreData: false}
      
        default:
          return state;
      }

    }

  
    // articles array
    const [articles, articlesDispatch] = useReducer(dataReducer, {data: [], fetching: true, hasMoreData: true})

    const pageReducer = (state, action) => {
      switch (action.type) {
        case 'NEXT_PAGE':
          return state + 1;
      
        default:
          return state;
      }
    }

    // articlesPage
    const [articlesPage, articlesPageDispatch] = useReducer(pageReducer, 1)

    // using custom Hooks to fetch data
    useFetch( articlesDispatch, `/articles?page=${articlesPage}`)

    // target node for triggering infinite scroll
    const targetNode = useRef(null);

    // infinite scroll for articles
    useInfiniteScroll(targetNode, articlesPageDispatch)


  return (
      <StyledContent
      className="float-md-left pt-md-4 pt-5 pb-5" 
      >
      <div className="container">
        {  
          articles.data.map( article => {
            return <Article key={`article-${article.id}`} article={article} url={article.url}/>      
          })                
        } 
        {articles.error && 
        <div className="text-center">
          {articles.error}
        </div>
        }

        {articles.fetching
         && 
        <div className="text-center">
          <Loader type="TailSpin" timeout={3000} color="Blue" height={80} width={80} />
        </div>
        }     
        {articles.hasMoreData 
        ? 
        <div ref={targetNode}>
        </div>        
        :
          <div className="text-center font-weight-bold">
            There's no more content currently. <br/>
            Meanwhile you can write an article or post a article to let others know what you're upto.
          </div>

        }  
      </div>
      </StyledContent>
    );
};


export default Content;