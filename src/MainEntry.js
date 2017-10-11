import React from 'react'
import { connect } from 'react-redux';
// import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './AppNavigator'
class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default AppWithNavigationState = connect(mapStateToProps)(App);
