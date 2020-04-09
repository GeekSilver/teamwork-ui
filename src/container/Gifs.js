import React, { Component } from 'react';

import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/GifsRightSidebar';
import AddArticle from './AddArticle';
import AddGif from './AddGif';

class Feed extends Component{
  render (){
    return (
      <div>
        <AddArticle {...this.props}/>
        <AddGif {...this.props}/>  
        <LeftSidebar/>
        <RightSidebar {...this.props}/>
    </div>
    );
  }
}

export default Feed;