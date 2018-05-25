import * as React from 'react';

const img = require('../../assets/images/pig.jpg');
const html = require('../../assets/html/embed.html');

export class Profile extends React.Component<any, any> {
  render() {
    return (
      <div>
        <div>This is my profile!</div>
        <img src={img} />
        <div>{html}</div>
      </div>
    );
  }
}

export default Profile;
