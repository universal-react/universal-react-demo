import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import request from 'xhr-request';

import { getUserList, toogleBlankVisible } from './action';

// component.js
import styles from './home.css';

const Home = (props) =>  {
  const { list, blankVisible, dispatch } = props;
  const userListDOM = list.map((v, i) => <p key={i}>name: {v.name}</p>);
  return (
    <div className={styles.red}>
      Hello world
        <div>
        {userListDOM}
      </div>
      <button onClick={() => dispatch(toogleBlankVisible())}>toggle blank</button>
      {blankVisible ?
        <div className={styles.blank}>blank</div>
        : null}
    </div>
  );
};

Home.getCssFile = 'home';

Home.getInitialData = function (dispatch) {
  return dispatch(getUserList());
}

const mapState2Props = store => {
  return {...store.home};
}

const mapDispatch2Props = dispatch => {
  return {
    getUserList,
    toogleBlankVisible,
  }
}

export default connect(mapState2Props)(Home);
 