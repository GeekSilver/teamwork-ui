import React, { Component } from "react";

import Comment from './Comment';
import Author from './Author';

import placeholder from '../assets/placeholder.jpg';

class Gif extends Component {
  constructor(props){
    super(props);
    this.state = {
      comments: [],
      author: {},
    }
    this.API_URL = process.env.REACT_APP_API;
  }


  componentDidMount(){
    fetch(`${this.API_URL}/gifs/${this.props.gif.id}/comments`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      this.setState({comments: response.data});     
    });

    // fetch author details
            // get article authors username
            fetch(`${this.API_URL}/employees/${this.props.gif.employee_id}`)
            .then(response => {
              return response.json();
            })
            .then(response => {
              this.setState({author: response.data})
            });
  }

  render(){
    return (
      <section id="gif">
      <div id="article">
      <Author author={this.state.author.name} created_at={this.props.gif.created_at} />
        <img data-src={this.props.url} src={placeholder} className="d-block img-fluid mx-auto" alt="a gif" title="gif"/>
        <div>
          <span className="my-1 d-flex align-items-center" data-toggle="collapse" data-target={`#gif${this.props.gif.id}`}>
            <i className="material-icons" >
              comment
            </i>
            {
            this.state.comments.filter(item => 
                  item.gif_id === this.props.gif.id
                ).length !== 0 ?
                  this.state.comments.filter(item => 
                  item.gif_id === this.props.gif.id
                ).length :
                  '' 
            }      
          </span>

          <div className="collapse" id={`gif${this.props.gif.id}`}>
            <ul className="py-2">
              
              {               
                this.state.comments.map(comment => {
                  if(this.props.gif.id === comment.gif_id){
                    return <Comment key={comment.id} comment={comment}/>
                  }
                  return '';
                })
              }
            </ul>
            <form>
              <div className="form-group">
                <textarea className="form-control col-md-6"></textarea>
                <br/>
                <button className="btn btn-primary">Comment</button>
              </div>        
            </form>   
          </div>
       
        </div>

      </div>
    </section>
    );    
  }

}


export default Gif;