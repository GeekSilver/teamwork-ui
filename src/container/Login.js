import React, { Component } from "react";
import styled from "styled-components";
import ls from "local-storage";

import backgroundImg from '../assets/8727.jpg';
import logo from '../assets/unity.svg';

const StyledLogin = styled.div`
@media (min-width: 768px){
  background: url(${backgroundImg}) no-repeat center;
}
@media (max-width: 767px){
  background: url(${backgroundImg}) no-repeat top;
}
  height: 100vh;
  
`;

let StyledForm = styled.form`
@media (min-width: 768px){
  margin-top: 7vh;
}
@media (max-width: 767px){
  margin-top: 10vh;
} 
`;

const LogoImage = styled.img`
@media (max-width: 767px){
  height: 72px;
  width:  72px;
  display: block;
  margin: auto;
}
@media (min-width: 768px){
  heigh: 100px;
  width: 100px;
  display: block;
  margin: auto;
}
`;

const LogoText = styled.h2`
  font-family: "Amiri", serif;
`;

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    let name = event.target.name;
    let value = event.target.value;
    if(name === 'email'){
      return this.setState((prevState) => ({
        ...prevState,
        email:  value,
      }));
    }
    else if(name === 'password'){
      return this.setState((prevState) => ({
        ...prevState,
        password: value,
      }));
    }  
  }

  handleSubmit(event){
    event.preventDefault();
    document.getElementById("InputEmail1").classList.remove('is-invalid')
    document.getElementById("InputPassword1").classList.remove('is-invalid')

    fetch(`https://teamwork-rest-api.herokuapp.com/teamwork/v1/employees/login`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    }).then(
      (response) => {
        return response.json();
      } 
    ).then(
      (response) => {
        if (response.status === 'success'){
          ls.set('currUser', {
            id: response.id,
            token: response.data,
            userName: response.userName,
          });        
          this.props.history.push('/feed')
        }
        else if(response.status === 'error'){
          if(response.error === 'employee not in records'){
            document.getElementById("InputEmail1").classList.add('is-invalid')
          }
          document.getElementById("InputPassword1").classList.add('is-invalid')
        }
      }
    );
  }

  render(){
    return (
      <StyledLogin className="row">
      <StyledForm id="loginForm" onSubmit={this.handleSubmit} className="offset-md-4 col-md-4 offset-1 col-10">
          <LogoImage src={logo} alt="teamwork app logo"/>
          <LogoText className="text-center text-white my-4 font-weight-bold">
            <span className="d-none d-md-block">Log in to teamwork</span>
            <span className="d-md-none">teamwork</span>
          </LogoText>
          <div className="form-group text-white" id="emailFormGroup">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input name="email" value={this.state.email} onChange={this.handleChange}
             type="email" className="form-control" id="InputEmail1" 
             aria-describedby="emailHelp" required/>
            <div className="invalid-feedback">
              <label>Invalid email</label>
            </div>
          </div>
          <div className="form-group text-white" id="passwordFormGroup">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input name="password" value={this.state.password} 
              onChange={this.handleChange} 
              type="password" 
              className="form-control" id="InputPassword1" required/>
            <div className="invalid-feedback">
              <label>Invalid password</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Log in</button>      
      </StyledForm>
    </StyledLogin>
    )
  }

}

export default Login;