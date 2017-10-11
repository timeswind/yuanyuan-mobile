import React from 'react'
import {View, Text, ScrollView, StyleSheet, Image, TouchableHighlight} from 'react-native'
import { connect } from 'react-redux';
import * as AuthActions from '../redux/actions/auth';
import { bindActionCreators } from 'redux';
import { List, Button } from 'antd-mobile';
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
  logOutButton: {
    margin: 16
  }
});

class ProfileDetailScreen extends React.Component {
  static navigationOptions = {
    title: '我',
  };

  state = {
    listViewData: [
      {key: 'name'},
      {key: 'logout'},
    ]
  }

  logout = () => {
    const self = this
    this.props.actions.logout().then(()=>{
      console.log(self.props.auth)
      if (self.props.auth.isLogin === false) {
        self.props.navigation.goBack()
      }
    })
  }

  render() {
    const { auth } = this.props
    return (
      <ScrollView scrollEnabled={true} contentContainerStyle={styles.contentContainer}>
        <List renderHeader={() => '个人信息'} className="my-list">
          <Item extra={auth.name} onLongPress={this.handleLongPress}>姓名</Item>
          <Item extra={auth.email} onLongPress={this.handleLongPress}>邮箱</Item>
          <Item extra={auth.school} onLongPress={this.handleLongPress}>学校</Item>
        </List>
        <Button style={styles.logOutButton} type="primary" onClick={this.logout}>登出</Button>
      </ScrollView>

    )
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
    actions: bindActionCreators(Object.assign({}, AuthActions), dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ProfileDetailScreen);
