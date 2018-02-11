import React, { Component } from 'react';

/**
 * @deprecated
 * decorator 用于 client 渲染页面组件
 * 坏处（抑或是好处？）是每次组件前端mount都会主动请求数据
 * @param {*} title 页面标题
 * @param {*} initialFunc 页面初始化数据 
 */
const entry = (title = 'page title', initialFunc) => {
  return function (PageComp) {
    return class ContainerComp extends Component {
      constructor(props) {
        super(props);
      }

      async componentDidMount() {
        document.title = title;
        if (initialFunc) {
          try {
            const result = await initialFunc(this.props.dispatch);
          } catch (error) {
            throw error;
          }
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

export default entry;