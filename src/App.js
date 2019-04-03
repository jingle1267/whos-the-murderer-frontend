import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadImagePage from './pages/UploadImagePage';
import Page404 from './pages/page404';
import AppNav from './components/AppNav/AppNav'

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">

        <BrowserRouter>
            <AppNav />
            <div  className="App-body">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/upload-file" component={UploadImagePage} />
              <Route path="*" component={Page404} />
            </Switch>
          </div>
        </BrowserRouter>

      </div>

    );
  }
}
export default App;