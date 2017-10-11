import React, { Component } from 'react'
import { Provider } from 'react-redux';
import store from './src/redux/store';
import MainEntry from './src/MainEntry';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainEntry />
      </Provider>
    );
  }
}

export default App;
