import React, { Component } from "react";
import ls from 'local-storage';

import Comment from './Comment';
import Author from './Author';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      author: {},
      user: ''
    }
    this.API_URL = process.env.REACT_APP_API;
    this.handleSubmitComment = this.handleSubmitComment.bind(this)
  }

  componentDidMount() {
    // get articles comments
    fetch(`${this.API_URL}/articles/${this.props.article.id}/comments`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ comments: response.data });
      });
    // get article authors username
    fetch(`${this.API_URL}/employees/${this.props.article.employee_id}`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ author: response.data })
      });

    // get currently logged in users name
    fetch(`${this.API_URL}/employees/${ls.get('currUser').id}`).then(
      (response) => response.json()
    ).then((resVal) => {
      if (resVal.status === 'success') {
        this.setState((prevState) => ({ ...prevState, user: resVal.data.name }));
        console.log(`usr name: ${resVal.data.name}`)
      }
    }).catch(err => {
      throw err;
    })
  }

  handleSubmitComment(event) {
    event.preventDefault();
    const articleID = this.props.article.id;
    const comment = document.getElementById(`${articleID}article-comment-val`).value;


    fetch(`${this.API_URL}/articles/${articleID}/comments`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${ls.get('currUser').token}`
      },
      body: JSON.stringify({
        id: `${ls.get('currUser').id}`,
        comment
      })
    }).then((response) => response.json()).then(
      (response) => {
        if (response.status === 'success') {
          // optimistic displaying new comment
            // new List element
            const newListItem = document.createElement('li');
            newListItem.classList.add('row');
            newListItem.setAttribute('key',`article-comment-${Date.now()}`);
            // new user span element
            const commentOwnerSpan = document.createElement('span');
            commentOwnerSpan.classList.add('font-weight-bolder', 'w-100');
            const userSpanText = document.createTextNode(this.state.user);
            commentOwnerSpan.appendChild(userSpanText);
            // new comment span element
            const commentSpan = document.createElement('span');
            commentSpan.classList.add('col-12', 'font-weight-lighter');
            const commentText = document.createTextNode(comment);
            commentSpan.appendChild(commentText);
            // append spans to list element
            newListItem.appendChild(commentOwnerSpan);
            newListItem.appendChild(commentSpan);
            // append list element to ul
            const commentList = document.getElementById(`article-comments-list${articleID}`);
            commentList.prepend(newListItem);
            // reset comment input field to ''
            document.getElementById(`${articleID}article-comment-val`).value = '';

          return;
        }
        else if (response.status === 'error') {
          console.error(response.error);
        }
      }
    )

  }



  render() {
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
            <ul id={`article-comments-list${this.props.article.id}`} className="py-2">
              {
                this.state.comments.map(comment => {
                  if (this.props.article.id === comment.article_id) {
                    return <Comment key={comment.id} comment={comment} />
                  }
                  return '';
                })
              }
            </ul>
            <form onSubmit={this.handleSubmitComment}>
              <div className="form-group">
                <textarea id={`${this.props.article.id}article-comment-val`} className="form-control col-md-6"></textarea>
                <br />
                <button type="submit" className="btn btn-primary">Comment</button>
              </div>
            </form>
          </div>

        </div>


      </section>
    );
  }

};

export default Article;