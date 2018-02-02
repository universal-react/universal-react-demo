import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import request from 'xhr-request';

import entryDecorator, { testD } from '../../utils/entry-decorator';
import { getUserList, toogleBlankVisible } from './action';

// component.js
import styles from './home.css';

export function getInitialData(dispatch) {
  return dispatch(getUserList());
}

@entryDecorator('home', getInitialData)
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('didmount')
    // this.props.dispatch(getUserList());
  }

  render() {
    const { list, blankVisible, dispatch } = this.props;
    const userListDOM = list.map((v, i) => <span key={i}>name: {v.name}</span>);

    return (
      <div className={styles.red}>
        Hello itc
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

Home.getCssFile = 'home';
Home.title = 'home page';
Home.getInitialData = getInitialData;

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
 