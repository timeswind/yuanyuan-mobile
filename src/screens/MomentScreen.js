import React from 'react'
import {Text} from 'react-native'
import { StackNavigator } from 'react-navigation';

class MomentScreen extends React.Component {
  static navigationOptions = {
    title: 'Moment',
  };
  render() {
    return <Text>Hello, Moment!</Text>;
  }
}

const MomentScreenWrapper = StackNavigator({
  momentHome: { screen: MomentScreen },
});

export default MomentScreenWrapper
