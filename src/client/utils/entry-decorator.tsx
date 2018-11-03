import React from 'react';
import { Dispatch } from 'redux';

/**
 * @deprecated
 * decorator 用于 client 渲染页面组件
 * 坏处（抑或是好处？）是每次组件前端mount都会主动请求数据
 * @param {*} title 页面标题
 * @param {*} initialFunc 页面初始化数据
 */
const entry = (title = 'page title', initialFunc?: (dispatch: Dispatch<any>) => Promise<any>) => {
  // tslint:disable-next-line:variable-name
  return (PageComp: React.ComponentClass) => {
    return class ContainerComp extends React.Component<any, any> {
      constructor(props: any) {
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
        );
      }
    };
  };
};

export default entry;
