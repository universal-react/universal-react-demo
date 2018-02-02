import React, { Component } from 'react';

/**
 * decorator 用于 client 渲染页面组件
 * 坏处（抑或是好处？）是每次组件前端mount都会主动请求数据
 * @param {*} title 页面标题
 * @param {*} initialFunc 页面初始化数据 
 */
const entryDecorator = (title = 'page title', initialFunc) => {
  return function (PageComp) {
    return class extends Component {
      constructor(props) {
        super(props);
      }

      componentDidMount() {
        console.log(`${title} mount, initial store`);
        document.title = title;
        if (initialFunc) {
          initialFunc(this.props.dispatch);
        }
      }

      render() {
        return (
          <PageComp {...this.props} />
        )
      }
    }
  }
}
export default entryDecorator;