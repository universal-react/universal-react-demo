import React from 'react';
import { connect } from 'react-redux';

import {
  getInitialData,
  getUserList,
  toogleBlankVisible,
} from './action';

import styles from './home.css';

class Home extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getInitialData();
  }

  handleBtnClick = () => {
    const { dispatch } = this.props;
    dispatch(toogleBlankVisible());
  }

  render() {
    const { list, blankVisible, dispatch } = this.props;
    const userListDOM = list.map((v, i) => <span key={i}>peopleName: {v.name}</span>);

    return (
      <div className={styles.red}>
      <header className={styles.header}>universal-react</header>
      <div>
          {userListDOM}
        </div>
        <button className={styles.button} onClick={this.handleBtnClick}>click</button>
        {blankVisible ?
          <div className={styles.blank}>blank</div>
          : null}
      </div>
    );
  }
}

(Home as any).title = 'home page';
(Home as any).getInitialData = getInitialData;

const mapState2Props = store => {
  return { ...store.home };
};

export default connect(mapState2Props, {
  getUserList,
  getInitialData,
})(Home);
