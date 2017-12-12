import React, { Component } from 'react'
import { Provider } from 'react-redux';
import configStore from './src/redux/store';
import MainEntry from './src/MainEntry';
import { PersistGate } from 'redux-persist/es/integration/react'
const {store, persistor} = configStore

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}>
          <MainEntry />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
