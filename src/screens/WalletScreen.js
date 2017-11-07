import React from 'react'
import {View, Text, ScrollView, RefreshControl, StyleSheet, Image, TouchableHighlight, Button} from 'react-native'
import { connect } from 'react-redux';
import * as DataActions from '../redux/actions/data';
import { bindActionCreators } from 'redux';
import { List } from 'antd-mobile';
import WalletCard from '../components/WalletCard';
import AvailableCards from '../components/AvailableCards';

const Item = List.Item;
const Brief = Item.Brief;

const styles = StyleSheet.create({
  contentContainer: {

  }
});

class WalletScreen extends React.Component {
  static navigationOptions = {
    title: '卡包',
  }

  state = {
    refreshing: false
  }

  componentDidMount() {
    const { isLogin, school } = this.props.auth
    const self = this
    if (isLogin && school) {
      this.props.actions.fetchAvailableCards(school).then(function(){
        console.log('fetching availablecards')
        self.props.actions.fetchOwnedCards()
      })
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    const { isLogin, school } = this.props.auth
    const self = this
    if (isLogin && school) {
      this.props.actions.fetchAvailableCards(school).then(function(){
        console.log('fetching availablecards')
        self.props.actions.fetchOwnedCards().then(function() {
          self.setState({refreshing: false});
        })
      })
    }
  }

  render() {
    const { auth } = this.props
    return (
      <View style={{height: '100%'}}>
        <ScrollView
          ref="_scrollview"
          scrollEnabled={true}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              />
          }>
          <AvailableCards navigation={this.props.navigation}/>

        </ScrollView>
      </View>
    );
  }
}


const mapStatesToProps = (states) => {
  return {
    auth: states.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(Object.assign({}, DataActions), dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(WalletScreen);
