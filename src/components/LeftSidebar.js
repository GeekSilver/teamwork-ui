import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Nav from './Nav';

const StyledLeftSideBar = styled.div`
  @media (min-width: 768px){
    width: 25%;
  }
  @media (max-width: 767px){
    width: 100%;
    z-index: 1;
  }
`;



const LeftSidebar = () => {
  return (
  <StyledLeftSideBar 
    id="left-sidebar"
    className="pt-md-4 d-md-flex flex-nowrap flex-md-column float-md-left position-fixed"
    style={{left: 0}}
    >
    <Header/>
    <Nav/>
  </StyledLeftSideBar>    
  );
};

export default LeftSidebar;
