import { useEffect, useCallback } from 'react';

export const useFetch = (url, dispatch) => {
  useEffect( () => {
    dispatch({type: 'FETCHING_DATA', fetching: true});

    console.log(`just started fetch hook. Fetching: true`)

    fetch(url)
    .then( response => response.json())
    .then( responseData => {
      if(responseData.data.length > 0){
        dispatch({type: 'ADD_DATA', data: responseData.data})
        dispatch({type: 'FETCHING_DATA', fetching: false})   
        console.log(`just added more data. Fetching: false`)      
      }
      else{
        dispatch({type: 'END_OF_DATA'})
        dispatch({type: 'FETCHING_DATA', fetching: false}) 
        console.log(`end of data. Fetching: false`)
      }
    }).catch(
      error => {
        dispatch({type: 'FETCHING_DATA', fetching:false})
        
        dispatch({type: 'ERROR', error: error})
        console.log(`error occured. Fetching: false`)
      })
  }, [dispatch, url])
}

export const useInfiniteScroll = (nodeRef, dispatch) => {
  const observer = useCallback( target => {
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
      observer(nodeRef.current)
    }
  })
}