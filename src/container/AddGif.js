import React, { Component } from "react";
import ls from "local-storage";
import FormData from "form-data";

class AddGif extends Component {
  constructor(props) {
    super(props)   
    this.state = {
      gif: '',
      id: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formData = new FormData()
    this.formData.append('id', ls.get('currUser').id)
  }
  
  handleSubmit(event){
    event.preventDefault();
    this.formData.append('gif',document.getElementById('gifInput').files[0])
    fetch(`http://localhost:3001/teamwork/v1/gifs`,
    {
      method: "POST",
      headers: {
        'authorization': `bearer ${ls.get('currUser').token}`
      },
      body: this.formData
    }).then(
      (response) => response.json()   
    ).then((response)=>{
      if(response.status === 'success'){
        alert('gif added successfully!')
        document.getElementById('addGif').click()
        this.props.history.push('/gifs');
      }
      else if(response.status === 'error'){
        console.log(`error :${response.error}`)
        alert(`error adding gif`)
      }
    })
  }

  render() {
    return (
      <form  encType="multipart/form-data" onSubmit={this.handleSubmit}>
        <div className="modal fade" tabIndex="-1" id="addGif" role="dialog" aria-labelledby="addGifModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="custom-file modal-body">
                <input id="gifInput" type="file" className="custom-file-input" />
                <label className="custom-file-label">
                  Add Gif
              </label>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Add Gif
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

    )
  }
}

export default AddGif;