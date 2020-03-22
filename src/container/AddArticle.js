import React, { Component } from 'react';
import styled from "styled-components";
import ls from "local-storage";

const CloseButton = styled.button`
padding: 0;
background-color: transparent;
border: 0;
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
`;

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      id: ls.get('currUser').id,
      category: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch(`https://teamwork-rest-api.herokuapp.com/teamwork/v1/articles`,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${ls.get('currUser').token}`
      },
      body: JSON.stringify(this.state)
    }).then(
      (response) => (
        response.json()
      )
    ).then((response) => {
      if(response.status === 'success'){
        alert('successfully added article')
        document.getElementById('addArticleModal').click()
        this.props.history.push('/articles')
      }
      else if(response.status === 'error'){
        console.log(`error ${response.error}`)
        alert(`error adding article!`)
      }

    }) 
  }
  handleChange(event){
    const name = event.target.name;
    const value = event.target.value
    if(name === 'title'){
      this.setState((prevState)=>({
        ...prevState,
        title: value
      }))
    }
    else if(name === 'category'){
      this.setState((prevState) => ({
        ...prevState,
        category: value
      }))
    }
    else if(name === 'body'){
      this.setState((prevState)=>({
        ...prevState,
        body: value
      }))
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="modal fade" id="addArticleModal" tabIndex="-1" role="dialog" aria-labelledby="addArticleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title d-none d-md-block" id="addArticleModalLabel">Add New Article</h5>
                <CloseButton type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="material-icons d-md-none">keyboard_backspace</span>
                  <span className="close d-none d-md-block" aria-hidden="true">&times;</span>
                </CloseButton>
                <button type="submit" className="btn btn-primary d-md-none">Add Article</button>
              </div>
              <div className="modal-body">
                <input value={this.state.title} onChange={this.handleChange} name="title" placeholder="write your title here ..." className="form-control my-2" />
                <textarea value={this.state.body} onChange={this.handleChange} name="body" placeholder="write the body of your article here ..." rows="6" className="form-control">
                </textarea>
                <input name="category" value={this.state.category} onChange={this.handleChange} placeholder="this article category here.." className="form-control my-2" />
              </div>
              <div className="modal-footer d-none d-md-block">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Add Article</button>
              </div>
            </div>
          </div>
        </div>
      </form>

    );
  }
}

export default AddArticle;