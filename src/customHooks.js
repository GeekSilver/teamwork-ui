import { useEffect, useCallback, useRef } from 'react';

export const useFetch = (dispatch, page) => {
  useEffect( () => {
    const API_URL = process.env.REACT_APP_API;

    dispatch({type: 'FETCHING_DATA', fetching: true});

    fetch(`${API_URL}${page}`)
    .then( response => response.json())
    .then( responseData => {
      if(responseData.data.length > 0){
        dispatch({type: 'ADD_DATA', data: responseData.data})
        dispatch({type: 'FETCHING_DATA', fetching: false})        
      }
      else{
        dispatch({type: 'END_OF_DATA'})
        dispatch({type: 'FETCHING_DATA', fetching: false}) 
      }
    }).catch(
      error => {
        dispatch({type: 'FETCHING_DATA', fetching:false})
        
        dispatch({type: 'ERROR', error})
      })
  }, [dispatch, page])
}

export const useInfiniteScroll = (nodeRef, dispatch) => {
  const scrollObserver = useCallback( target => {
    new IntersectionObserver(entries => {
      entries.forEach( entry => {
        if ( entry.intersectionRatio > 0) {
          dispatch({type: 'NEXT_PAGE'})
        }
      })
    }).observe(target)     
  }, [dispatch]);

  useEffect(() => {
    if(nodeRef.current){
      scrollObserver(nodeRef.current)
    }
  },[scrollObserver, nodeRef])
}

export const useLazyLoadImages = (selector, items) => {
  const imgObserver = useCallback((node) => {
    const intObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.intersectionRatio > 0){
          const img = entry.target;
          const imgSrc = img.dataset.src;
          // only swap if data-src exists
          if(imgSrc){
            img.src = imgSrc;
          }
          else {
            console.error(`img source is broken`);
          }
          intObserver.unobserve(node); // detach observer when done
        }
      })
    })
    intObserver.observe(node);
  }, [])
  const imagesRef = useRef(selector)
  useEffect(() => {
    imagesRef.current = document.querySelectorAll(selector);
    if(imagesRef.current){
      imagesRef.current.forEach(img => imgObserver(img))
    }
  },[imgObserver, items, imagesRef, selector])
}