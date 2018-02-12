import React, { Component } from 'react'
import universal from 'react-universal-component';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import Loading from '../../components/loading';

export const AsyncHome = universal(() => import('../home'), {
  resolve: () => require.resolveWeak('../home'),
  chunkName: 'container/home',
  minDelay: 500,
  loading: Loading,
});

export const AsyncProfile = universal(() => import('../profile'), {
  resolve: () => require.resolveWeak('../profile'),
  chunkName: 'container/profile',
  minDelay: 500,
  loading: Loading,
});

export class Root extends Component {
  render() {
    return (
      <div>
        <Link to="/home">hsssomlle</Link>
        <br />
        <Link to="/profile">profile</Link>
        <Route path="/home" component={AsyncHome} />
        <Route path="/profile" component={AsyncProfile} />
      </div>
    )
  }
}

export default Root;
