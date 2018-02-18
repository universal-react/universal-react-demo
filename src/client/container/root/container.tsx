import * as React from 'react';
import { Link } from 'react-router-dom';

export class Root extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Link to="/home">hsssomlle</Link>
        <br />
        <Link to="/profile">profile</Link>
      </div>
    );
  }
}

export default Root;
