import * as React from 'react';

import * as styles from './profile.css';

const img = require('../../assets/images/pig.jpg');
const html = require('../../assets/html/embed.html');

export class Profile extends React.Component<any, any> {
  render() {
    const arr = [2].includes(2);
    const aa = [2].find(v => v === 2);
    return (
      <div className={styles.profile}>
        <div>This is my profile!</div>
        <img src={img} />
        <div>{html}</div>
      </div>
    );
  }
}

export default Profile;
