import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import outlet from '../icons-master/icons/outlet.svg';
import doctext from '../icons-master/icons/document-text.svg';

const StyledNav = styled.nav`
@media (max-width: 767px){
  width: 100%;
  position: fixed;
  bottom: 0;
}
`;
const StyledSpan = styled.span`
  @media (max-width: 767px){
    display: none;
  }
`;

const Nav = () => {
  return (
    <StyledNav role="navigation">
      <ul className="nav flex-md-column align-items-center nav-justified text-capitalize font-weight-bolder">
        <li className="nav-item bg-primary rounded-pill my-md-2 mb-4 mb-md-0">
          <Link to="/feed" className="nav-link text-white">
            <img src={doctext} alt="" width="25" height="25"/>
            <img src={outlet} alt="" width="25" height="25"/>
            <StyledSpan>feed</StyledSpan>                  
          </Link>            
        </li>
        <li className="nav-item bg-primary rounded-pill  my-md-2 mb-4 mb-md-0">
          <Link to="/articles" className="nav-link text-white">
            <img src={doctext} alt=""  width="25" height="25"/>
            <StyledSpan>articles</StyledSpan>                
          </Link>
        </li>
        <li className="nav-item bg-primary rounded-pill  my-md-2 mb-4 mb-md-0">
          <Link to="/gifs" className="nav-link text-white">
            <img src={outlet} alt=""  width="25" height="25"/>
            <StyledSpan>gifs</StyledSpan>                
          </Link>
        </li>
      </ul>            
    </StyledNav>
  );


};

export default Nav;