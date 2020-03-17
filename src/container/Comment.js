import React, { Component } from "react";

class Comment extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: ''
    }
  }

  componentDidMount(){
    // get article authors username
    if (this.props.comment.employee_id !== undefined){
      fetch(`http://localhost:3001/teamwork/v1/employees/${this.props.comment.employee_id}`)
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