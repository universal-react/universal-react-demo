import * as React from 'react';

/**
 * @deprecated
 * @param {*function return Promise<Component>} getComponent
 */
function asyncComp(getComponent: () => Promise<any>) {
  return class AsyncComponent extends React.Component {
    // tslint:disable-next-line:variable-name
    static Component: any = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        // tslint:disable-next-line:variable-name
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}

export default asyncComp;
