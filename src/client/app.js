import React from 'react';
import { AsyncHome, AsyncProfile } from './routers';
import { Route, Link } from 'react-router-dom'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/profile'}>profile</Link></li>
          </ul>
          <Route exact path={'/profile'} component={AsyncProfile} />
          <Route exact path={'/'} component={AsyncHome} />
        </div>
      </div>
    )
  }
}

// export default Main;