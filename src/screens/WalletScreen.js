import React from 'react'
import {View, Text, ScrollView, RefreshControl, StyleSheet, Image, TouchableHighlight, Button} from 'react-native'
import { connect } from 'react-redux';
import * as DataActions from '../redux/actions/data';
import { bindActionCreators } from 'redux';
import { List, Button as AntButton } from 'antd-mobile';
import WalletCard from '../components/WalletCard';
import AvailableCards from '../components/AvailableCards';

const Item = List.Item;
const Brief = Item.Brief;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 0
  },
  loginButton: {
    margin: 16
  },
  icon: {
    width: 26,
    height: 26,
  }
});

class WalletScreen extends React.Component {
  static navigationOptions = {
    title: '卡包',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/walletTabbarIcon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
        />
    )
  }

  state = {
    refreshing: false
  }

  componentDidMount() {
    const { isLogin, school } = this.props.auth
    if (isLogin && school) {
      this.fetchCardData(school)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
    const { isLogin, school } = this.props.auth
    if (isLogin === false) {
      if (nextProps.auth.isLogin === true && nextProps.auth.school !== '') {
        console.log('hit')
        this.fetchCardData(nextProps.auth.school)
      }
    }
  }

  _onRefresh() {
    const { isLogin, school } = this.props.auth
    if (isLogin && school) {
      this.fetchCardData(school)
    }
  }

  fetchCardData(school) {
    this.startRefreshing()
    const self = this
    this.props.actions.fetchAvailableCards(school).then(function(){
      self.props.actions.fetchOwnedCards().then(function() {
        self.stopRefreshing()
      })
    })
  }

  startRefreshing() {
    this.setState({refreshing: true})
  }

  stopRefreshing() {
    this.setState({refreshing: false})
  }

  loginButtonOnClick = () => {
    if (this.props.auth.isLogin === false) {
      this.props.navigation.navigate('login')
    }
  }

  render() {
    const { auth } = this.props
    return (
      <View style={{height: '100%'}}>
        {auth.isLogin ? (
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
        ) : (
          <View>
            <AntButton type="primary" style={styles.loginButton} onClick={this.loginButtonOnClick}>
              登录
            </AntButton>
          </View>
        )}
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
