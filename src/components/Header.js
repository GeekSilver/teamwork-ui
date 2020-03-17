import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';


import logo from '../assets/unity.svg';

const StyledHeader = styled.div`
 font-family: "Amiri", serif;
 @media (max-width: 767px){
   width: 100%;
   display: flex;
   flex-wrap: nowrap;
   align-items: center;
   justify-content: space-between;
 }
`;

const StyledI = styled.i`
  @media (max-width: 767px){
    color: gray;
    fontSize: 1.7em;
  }
`;
const LogoImage = styled.img`
@media (min-width: 768px){
  height: 52px;
  width: 52px;
  display: block;
}
@media (max-width: 767px){
  height: 32px;
  widht: 32px;
}
`;

class Header extends Component {
  componentDidMount(){
    $('#settings').click(function () {
      $('#logOut > h2').toggleClass('hideLogout');
      $('#logOut > button').toggleClass('hideLogout');        
    })
  }

  render(){
    return (
      <StyledHeader className="bg-light">
        <Link to="/" className="ml-2 ml-md-0 brand text-primary text-decoration-none text-md-center">
          <LogoImage src={logo} className="m-2 mx-auto" alt="teamwork app logo"></LogoImage> 
        </Link>
        <StyledI className="material-icons d-md-none mr-2 mr-md-0" id="settings">settings</StyledI>   
      </StyledHeader>
    );    
  }

};

export default Header;