import * as React from 'react';

const img = require('../../assets/images/pig.jpg');

export class Profile extends React.Component<any, any> {
  render() {
    return (
      <div>
        <div>This is my profile!</div>
        <img src={img} />
      </div>
    );
  }
}

export default Profile;
