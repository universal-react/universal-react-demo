import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserList, toogleBlankVisible } from './action';

import styles from './home.css';

export function getInitialData(dispatch) {
  return dispatch(getUserList());
}

class Home extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getInitialData(this.props.dispatch);
  }

  render() {
    const { list, blankVisible, dispatch } = this.props;
    const userListDOM = list.map((v, i) => <span key={i}>name: {v.name}</span>);

    return (
      <div className={styles.red}>
      <span>Hello</span>
      <div>
          {userListDOM}
        </div>
        <button onClick={() => dispatch(toogleBlankVisible())}>toggle blank</button>
        {blankVisible ?
          <div className={styles.blank}>blank</div>
          : null}
      </div>
    );
  }
}

Home.title = 'home page';
Home.getInitialData = getInitialData;

const mapState2Props = store => {
  return { ...store.home };
}

Home.propTypes = {
  list: PropTypes.array,
  blankVisible: PropTypes.bool,
  dispatch: PropTypes.func
}

export default connect(mapState2Props)(Home);
 