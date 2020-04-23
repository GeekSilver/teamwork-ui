import React, { Component } from "react";
import ls from 'local-storage';

import Comment from './Comment';
import Author from './Author';

import placeholder from '../assets/placeholder.jpg';

class Gif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      author: {},
      user:''
    }
    this.API_URL = process.env.REACT_APP_API;
    this.handleSubmitComment = this.handleSubmitComment.bind(this)
  }


  componentDidMount() {
    fetch(`${this.API_URL}/gifs/${this.props.gif.id}/comments`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log('gif id', this.props.gif.id)
        console.log('comments ', response.data)
        this.setState((prevState) => ({...prevState, comments: response.data }));
      });

    // get article authors username
    fetch(`${this.API_URL}/employees/${this.props.gif.employee_id}`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState((prevState) => ({...prevState, author: response.data }))
      });

      // get currently logged in users name
      fetch(`${this.API_URL}/employees/${ls.get('currUser').id}`).then(
        (response) => response.json()
      ).then((resVal) => {
        if(resVal.status === 'success'){
          this.setState((prevState) => ({...prevState, user: resVal.data.name}));
        }
      }).catch(err => {
        throw err;
      })
  }

  handleSubmitComment(event) {
    event.preventDefault();
    const gifID = this.props.gif.id;
    const comment = document.getElementById(`${gifID}gif-comment-val`).value;


    fetch(`${this.API_URL}/gifs/${gifID}/comments`, {
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
            newListItem.setAttribute('key',`gif-comment-${Date.now()}`);
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
            const commentList = document.getElementById(`gif-comments-list${gifID}`);
            commentList.prepend(newListItem);
            // reset comment input field to ''
            document.getElementById(`${gifID}gif-comment-val`).value = '';

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
      <section id="gif">
        <div id="article">
          <Author author={this.state.author.name} created_at={this.props.gif.created_at} />
          <img data-src={this.props.url} src={placeholder} className="d-block img-fluid mx-auto" alt="a gif" title="gif" />
          <div>
            <span className="my-1 d-flex align-items-center" data-toggle="collapse" data-target={`#gif${this.props.gif.id}`}>
              <i className="material-icons" >
                comment
            </i>
              {
                // calculate comments
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
              <ul id={`gif-comments-list${this.props.gif.id}`} className="py-2">

                {
                  this.state.comments.map(comment => {
                    if (this.props.gif.id === comment.gif_id) {
                      return <Comment key={comment.id} comment={comment} />
                    }
                    return '';
                  })
                }
              </ul>
              <form onSubmit={this.handleSubmitComment}>
                <div className="form-group">
                  <textarea id={`${this.props.gif.id}gif-comment-val`} className="form-control col-md-6"></textarea>
                  <br />
                  <button type="submit" className="btn btn-primary">Comment</button>
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