import React from 'react'
import {View, Text, ScrollView, StyleSheet, Image, TouchableHighlight} from 'react-native'
import { connect } from 'react-redux';
import * as AuthActions from '../redux/actions/auth';
import { bindActionCreators } from 'redux';
import { List, Button } from 'antd-mobile';
import { ImagePicker } from 'expo';
import { uploadImageWithFolder } from '../utils/upload'
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

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);
    const self = this
    if (!result.cancelled) {
      console.log(result)
      this.setState({ image: result.uri });
      uploadImageWithFolder(result.uri, "avatar").then(function(response){
        console.log("upload success", response.data.link)
        self.props.actions.updateAvatar(response.data.link)
      })
      .catch((errorResponse) => console.log(errorResponse))
    }
  };

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
    const { auth } = this.props;
    console.log(auth)
    return (
      <ScrollView scrollEnabled={true} contentContainerStyle={styles.contentContainer}>
        <List renderHeader={() => '个人信息'} className="my-list">
          <Item extra={
              <Image style={{borderRadius: 0, width: 80, height: 80, marginVertical: 8}} source={{uri: (auth.avatar !== "" ? auth.avatar : 'http://placehold.it/80x80') }}/>
            }
            onClick={this._pickImage}
            >头像<Brief>点击修改</Brief></Item>
          <Item extra={auth.name}>姓名</Item>
          <Item extra={auth.email}>邮箱</Item>
          <Item extra={auth.school}>学校</Item>
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
