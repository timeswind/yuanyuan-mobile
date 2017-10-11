import React from 'react'
import {View, Text, ScrollView, StyleSheet, Image, TouchableHighlight} from 'react-native'
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import * as AuthActions from '../redux/actions/auth';
import { bindActionCreators } from 'redux';
import { List } from 'antd-mobile';
import WalletCard from '../components/WalletCard';

const Item = List.Item;
const Brief = Item.Brief;

const styles = StyleSheet.create({

});

class WalletScreen extends React.Component {
  static navigationOptions = {
    title: '卡包',
  };

  render() {
    const { auth } = this.props
    return (
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <ScrollView scrollEnabled={true} contentContainerStyle={styles.contentContainer}>
          <WalletCard cardName="会员卡" organizationName="ISIA" backgroudImageUri="https://m.foolcdn.com/media/dubs/credit-card-art/chase-sapphire-preferred.png"/>
          <WalletCard backgroudImageUri="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/mac_apps/itunes/apple-music-gift-card.jpg"/>

          <WalletCard backgroudImageUri="http://2c2f06a14a9ade4267e6-fb8aac3b3bf42afe824f73b606f0aa4c.r92.cf1.rackcdn.com/tenantlogos/6993.png"/>

          <WalletCard />


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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch,
//     actions: bindActionCreators(Object.assign({}, AuthActions), dispatch)
//   };
// }

export default connect(mapStatesToProps, null)(WalletScreen);
