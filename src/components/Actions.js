import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';
import ls from "local-storage";

import '../container/AddArticle';
import './Action.css';

const AddGif = styled.div`
@media (max-width: 767px){
  position: fixed;
  right: 15%;
  bottom: 13%; 
}
`;

const AddArticleDiv = styled.div`
@media (max-width: 767px){
  position: fixed;
  left: 15%;
  bottom: 13%;
}
`;

const StyledActions = styled.div`
  @media (min-width: 768px){
    position: fixed;
    right: 0;
    width: 35%;
    transform: translate(17%,0);
  }
`;

const StyledLogout = styled.div`
  @media (max-width: 767px){
    bottom: 0;
    position: fixed;
    z-index: 1;
    width: 100%;
  }
`;

const CancelButton = styled.button`
  @media (max-width: 767px){
    width: 100%;
  }
`;

class Actions extends Component {
  constructor(props){
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount(){
    $('#cancelBtn').click(function () {
      $('#logOut > h2').addClass('hideLogout');
      $('#logOut > button').addClass('hideLogout');
    });
  }

  signOut(event){
    event.preventDefault();
    ls.remove('currUser');
    this.props.history.push("/");
  }

  render(){
    return (
    <BrowserRouter>
      <StyledActions 
          className="d-md-flex flex-md-column align-items-center float-md-right mt-md-4 text-capitalize">  
        <h2 id="action-title" className="d-none d-md-block font-weight-bolder">Actions</h2>

        <AddGif data-toggle="modal" data-target="#addGif"  className="mb-md-3 bg-primary rounded-pill">
          <Link to="" className="btn btn-add d-flex align-items-center text-white">
            <i className="material-icons">add_photo_alternate</i>
            <span className="d-none d-md-block font-weight-bolder">Add Gif</span> 
          </Link>
        </AddGif>

        <AddArticleDiv data-toggle="modal" data-target="#addArticleModal"
          className="my-md-1 bg-primary rounded-pill">
          <Link to="" className="btn btn-add d-flex align-items-center text-white">
            <i className="material-icons">post_add</i>
            <span className="d-none d-md-block font-weight-bolder">Add Article</span> 
          </Link>          
        </AddArticleDiv>

        <StyledLogout className="d-flex flex-column align-items-center text-center mt-md-3 bg-light " id="logOut">
          <h2 className="font-weight-bolder hideLogout">{ls.get('currUser').userName}</h2>             
          <button className="btn bg-primary rounded-pill btn-logout text-white hideLogout" onClick={this.signOut}>
            <i className="fas fa-sign-out-alt"></i>
            <span className="font-weight-bolder">Sign Out</span>
          </button>   
          <br/>
          <CancelButton type="button" id="cancelBtn" className="hideLogout d-md-none btn bg-primary rounded-pill text-white font-weight-bolder mb-4 mb-md-0">
            cancel
          </CancelButton>       
        </StyledLogout>
      </StyledActions>      
    </BrowserRouter>
      

    );
  }

};

export default Actions;