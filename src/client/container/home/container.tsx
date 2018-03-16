import * as PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';

import { getUserList, toogleBlankVisible } from './action';

import styles from './home.css';
// const styles = require('./home.css');

// const styles = {
//   red: 'red',
//   blank: 'block',
// };

export function getInitialData(dispatch) {
  return dispatch(getUserList());
}

class Home extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getInitialData(this.props.dispatch);
  }

  handleBtnClick = () => {
    const { dispatch } = this.props;
    dispatch(toogleBlankVisible());
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
        <button onClick={this.handleBtnClick}>toggle blank</button>
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

(Home as any).propTypes = {
  list: PropTypes.array,
  blankVisible: PropTypes.bool,
  dispatch: PropTypes.func
};

export default connect(mapState2Props)(Home);