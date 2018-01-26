import React, { Component } from 'react';


export class Hello extends Component {
  t = 0;
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var global,window
    console.time('mount');
    if (window) {
      this.t =  window.performance.now();
    }
  }

  componentDidMount(){
    console.timeEnd('mount');
    if (window) {
      this.t = window.performance.now() - this.t;
    }
    console.log(this.t);
  }

  render() {
    return (
      <div>
        Hello world
        {Object.keys(Array.from({ length: 10000 })).map((i,index) => <div key={index}>{index}</div>)}
      </div>
    )
  }
}

export default Hello;
 