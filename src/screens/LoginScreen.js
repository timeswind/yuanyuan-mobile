import React from 'react'
import { createForm } from 'rc-form';
import Dimensions from 'Dimensions';
import {View, Text, FlatList, StyleSheet, Image, TouchableHighlight} from 'react-native'
import {Button, List, InputItem, WhiteSpace} from 'antd-mobile'
import { connect } from 'react-redux';
import * as AuthActions from '../redux/actions/auth';
import { bindActionCreators } from 'redux';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 32,
    marginBottom: 64
  },
  exitButton: {
    marginRight: 16,
    width: 32,
    height: 32
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    paddingLeft: 45,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  inputWrapper: {
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  loginButton: {
    marginHorizontal: 32,
    marginTop: 16
  },
  loginErrorText: {
    color: 'red', marginHorizontal: 16, marginTop: 16, fontSize: 16
  }
});

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: '我',
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      console.log('// screen enter (refresh data, update ui ...)')
    }
    if (this.props.isFocused && !nextProps.isFocused) {
      console.log('// screen exit')
    }
  }

  submit = () => {
    const self = this
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      self.props.actions.login(value.email, value.password).then(() => {
        if (self.props.auth.isLogin) {
          self.props.navigation.goBack()
        }
      })
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { auth } = this.props
    return (
      <View>
        <TouchableHighlight underlayColor="transparent" style={styles.header} onPress={() => this.props.navigation.goBack()}>
          <Image style={styles.exitButton} source={require('../images/deleteFilled.png')}/>
        </TouchableHighlight>
        <List renderHeader={() => '登录'}>
          <InputItem
            {...getFieldProps('email')}
            autoCapitalize="none"
            clear
            placeholder=""
            autoFocus
            >邮箱</InputItem>
          <InputItem
            {...getFieldProps('password')}
            clear
            placeholder=""
            autoFocus
            type="password"
            >密码</InputItem>
        </List>
        {auth.loginError && (<Text style={styles.loginErrorText}>{auth.loginError}</Text>)}
        <Button type="primary" style={styles.loginButton} onClick={this.submit}>
          登录
        </Button>
      </View>
    );
  }
}

const formWrapper = createForm()(LoginScreen)

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

export default connect(mapStatesToProps, mapDispatchToProps)(formWrapper);
