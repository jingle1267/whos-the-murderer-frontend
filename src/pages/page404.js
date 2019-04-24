import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Page404 extends Component {

  render() {
    return (
      <div>
        <h1>404!</h1>
        
        <h3>No match found for 
          <code>
            { this.props.match.params[0] }
          </code>
        </h3>

        <Link to="/">
          <button> 
            Return to Home Page 
          </button>
        </Link>

      </div>
    );
  }
}

export default Page404;

