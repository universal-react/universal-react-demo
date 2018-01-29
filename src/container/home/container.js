import React, { Component } from 'react';

import request from 'xhr-request';

// component.js
import styles from './home.css';

export class Home extends Component {
  t = 0;
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }

  componentWillMount() {
    var global,window;
    console.log(styles)
    if (window) {
      this.t =  window.performance.now();
    }
    const p = this.props;
    console.log(p);
    if (this.props.staticContext) {
      this.setState({
        list: this.props.staticContext.list,
      });
    }
  }

  componentDidMount(){
    if (window) {
      this.t = window.performance.now() - this.t;
    }
    console.log(this.t);
  }

  render() {
    const userListDOM = this.state.list.map((v,i) => <p key={i}>name: {v.name}</p>);
    return (
      <div className={styles.red}>
        Hello world
        <div>
          {userListDOM}
        </div>
        {Object.keys(Array.from({ length: 10000 })).map((i,index) => <div key={index}>{index}</div>)}
      </div>
    )
  }
}

Home.getCssFile = 'home';

Home.getInitialData = function () {
  return new Promise((resolve, reject) => {
    request('http://localhost:8388/user/list', {
      json: true,
      method: 'post',
    }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  });
}

export default Home;
 