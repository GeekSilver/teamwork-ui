import React, { Component } from "react";

import Comment from './Comment';
import Author from './Author';

class Article extends Component{
  constructor(props){
    super(props);
    this.state = {
      comments: [],
      author: {}
    }
    this.API_URL = process.env.REACT_APP_API;
  }

componentDidMount(){
  // get articles comments
  fetch(`${this.API_URL}/articles/${this.props.article.id}/comments`)
  .then(response => {
    return response.json();
  })
  .then(response => {
    this.setState({comments: response.data});
  });
        // get article authors username
        fetch(`${this.API_URL}/employees/${this.props.article.employee_id}`)
        .then(response => {
          return response.json();
        })
        .then(response => {
          this.setState({author: response.data})
        });
}
  render(){
    return (
      <section id="article" className="pt-4 pt-md-0 my-2 my-md-4">
      <Author author={this.state.author.name} title={this.props.article.title} created_at={this.props.article.created_at} />
      <article className="font-weight-lighter text-monospace text-black-400">
        {this.props.article.body}
      </article>
      <div>
        <span className="my-1 d-flex align-items-center" data-toggle="collapse" data-target={`#article${this.props.article.id}`}> 
          <i className="material-icons" >
            comment
          </i>     
          {
          this.state.comments.filter(item => 
                  item.article_id === this.props.article.id
                ).length !== 0 ?
                this.state.comments.filter(item => 
                  item.article_id === this.props.article.id
                ).length
                : 
                ''   
          }              
        </span>
        <div id={`article${this.props.article.id}`} className="collapse">
          <ul className="py-2">
            {
              this.state.comments.map(comment => {
                if(this.props.article.id === comment.article_id){
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


    </section>
    );    
  }

};

export default Article;