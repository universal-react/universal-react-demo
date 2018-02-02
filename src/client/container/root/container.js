import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Root extends Component {
  render() {
    return (
      <div>
        <Link to="/home">hsssomlle</Link>
        <br />
        <Link to="/profile">profile</Link>
      </div>
    )
  }
}

export default Root;
