import React, { Component } from "react";

class Comment extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: ''
    }
    this.API_URL = process.env.REACT_APP_API;
  }

  componentDidMount(){
    // get article authors username
    if (this.props.comment.employee_id !== undefined){
      fetch(`${this.API_URL}/employees/${this.props.comment.employee_id}`)
        .then(response => {
          return response.json();
        })
          .then(response => {
            this.setState({username: response.data});
          });      
    }
  }

  render(){
    return (
      <li className="row">
        <span className="font-weight-bolder w-100">{this.state.username.name}</span>
    <span className="col-12 font-weight-lighter">{this.props.comment.comment}</span>
      </li>
    );
  }
}

export default Comment;