import React from 'react';
import universal from 'react-universal-component'

import { Route, Link } from 'react-router-dom'

export const AsyncHome = universal(() => import('./container/home'), {
  resolve: () => require.resolveWeak('./container/home'),
  chunkName: 'container/home',
  minDelay: 500,
});

export const AsyncProfile = universal(() => import('./container/profile'), {
  resolve: () => require.resolveWeak('./container/profile'),
  chunkName: 'container/profile',
  minDelay: 500,
});

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