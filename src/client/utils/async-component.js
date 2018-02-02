import React from 'react';

/**
 * 
 * @param {*function return Promise<Component>} getComponent 
 */
function asyncComp(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component }
    
    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />
      }
      return null;
    }
  }
}

export default asyncComp;
