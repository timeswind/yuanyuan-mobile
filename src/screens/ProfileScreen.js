import React from 'react'
import {View, Text, ScrollView, StyleSheet, Image, TouchableHighlight} from 'react-native'
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import * as AuthActions from '../redux/actions/auth';
import { bindActionCreators } from 'redux';
import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  settingCell: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cellText: {
    fontSize: 18,
    marginLeft: 16
  }
});

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: '我',
  };

  profileSectorOnClick = () => {
    if (this.props.auth.isLogin === true) {
      this.props.navigation.navigate('profileDetail')
    } else {
      this.props.navigation.navigate('login')
    }
  }


  render() {
    const { auth } = this.props
    return (
      <ScrollView scrollEnabled={true} contentContainerStyle={styles.contentContainer}>
        <List  style={{marginTop: 32}}>
          <Item
            arrow="horizontal"
            multipleLine
            onClick={this.profileSectorOnClick}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{borderRadius: 0, width: 100, height: 80, margin: 8}} source={{uri: 'http://placehold.it/100x80'}}/>
              <View style={{flexDirection: 'column', marginLeft: 'auto'}}>
                <Text style={{fontSize: 20, color: '#333'}}>
                  {auth.isLogin ? auth.name : '登入'}
                </Text>
              </View>
            </View>
          </Item>
        </List>
        <List renderHeader={() => '功能'}>

          <Item
            arrow="horizontal"
            onClick={() => {}}
            >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{width: 24, height: 24}} source={require("../images/settingIcon.png")} />
              <Text style={{marginLeft: 16, fontSize: 16}}>设置</Text>
            </View>

          </Item>
        </List>
      </ScrollView>
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

export default connect(mapStatesToProps, null)(ProfileScreen);
