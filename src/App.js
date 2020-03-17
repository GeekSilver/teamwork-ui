import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch, 
  Route, 
  Redirect
} from 'react-router-dom';
import ls from 'local-storage';
import 'bootstrap';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/material-design-icons-iconfont/dist/material-design-icons.css';

import Feed from './container/Feed';
import Login from './container/Login';




const PrivateFeedRoute = ({children, ...rest}) => {
  return (
    <Route
    {...rest}
    render = {(props) => 
      ls.get('currUser') !==  null  ?
      (
        <Feed {...props}/>
      ) :
      (
        <Redirect
        to={{
          pathname:"/"
        }} />
      ) 
    }
    >
    </Route>
  )
}


class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <Switch>

            <Route exact path="/" 
              render={
                (props) =>  ls.get('currUser') !== null
                ? <Redirect to={{pathname:"/feed"}}/>  :  <Login {...props}/>
              }>  
            </Route>

            <PrivateFeedRoute path="/feed" />
            <PrivateFeedRoute path="/articles" />
            <PrivateFeedRoute path="/gifs" />
            
          </Switch>

        </div>
      </Router>
    );    
  }

}



export default App;
