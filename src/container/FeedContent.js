import React, { useReducer, useRef }  from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { useFetch, useInfiniteScroll, useLazyLoadImages } from '../customHooks';
import Article from './Article';
import Gif from './Gif';
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

    // feed array
    const [feed, feedDispatch] = useReducer(dataReducer, {data: [], fetching: true, hasMoreData: true})
    

    const pageReducer = (state, action) => {
      switch (action.type) {
        case 'NEXT_PAGE':
          return state + 1;
      
        default:
          return state;
      }
    }

    // feedPage
    const [feedPage, feedPageDispatch] = useReducer(pageReducer, 1)

    // using custom Hooks to fetch feed data
    useFetch( feedDispatch,`/feed?page=${feedPage}`)

    // target node for triggering infinite scroll
    const targetNode = useRef(null);

    //implenting infinite scroll for feed
    useInfiniteScroll(targetNode, feedPageDispatch)

    // lazy loading images for GET /feed
    useLazyLoadImages('.img-fluid', feed)

  return (
      <StyledContent
      className="float-md-left pt-md-4 pt-5 pb-5" 
      >
      <div className="container">
        {
          feed.data.map( article => {
            if(article.title !== null && article.title !== undefined){
              return <Article key={`feed-article-${article.id}`} article={article} />
            }
            return <Gif key={`feed-gif-${article.id}`} gif={article} url={article.url}/>      
      
          })            
        } 
        { feed.error &&
        <div className="text-center">
          {feed.error}
        </div>
        }
        { feed.fetching && 
        <div className="text-center">
          <Loader type="TailSpin" timeout={3000} color="Blue" height={80} width={80} />
        </div>
        }     
        { feed.hasMoreData
        ? 
        <div ref={targetNode}>
        </div>        
        :
          <div className="text-center font-weight-bold">
            There's no more content currently. <br/>
            Meanwhile you can write an article or post a gif to let others know what you're upto.
          </div>

        }  
      </div>
      </StyledContent>
    );
};


export default Content;