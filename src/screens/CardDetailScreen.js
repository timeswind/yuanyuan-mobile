import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  Button as NativeButton
} from 'react-native';
import { connect } from 'react-redux';
import * as DataActions from '../redux/actions/data';
import { bindActionCreators } from 'redux';
import WalletCardBig from '../components/WalletCard/big.js';
import { List, Button } from 'antd-mobile';
import ActionSheet from 'react-native-actionsheet'
const Item = List.Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: '#feffff',
  },
});

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 1
const options = [ '取消', '注销卡片' ]
const title = '更多'

class CardDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      card: null
    }
    this.handleActionSheetPress = this.handleActionSheetPress.bind(this)
    this.showActionSheet = this.showActionSheet.bind(this)
  }

  handleActionSheetPress(i) {
    if (i === DESTRUCTIVE_INDEX) {
      this.props.actions.deregisteredCard(this.state.card.cardId)
    }
  }

  showActionSheet() {
    this.ActionSheet.show()
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: {
        backgroundColor: "#feffff",
        elevation: 0,
        shadowOpacity: 0
      },
      headerRight: (
        <TouchableHighlight underlayColor="transparent" onPress={params.handleMoreActions ? params.handleMoreActions : () => null}>
          <Image
            source={require('../images/moreIcon.png')}
            style={{width:26, height: 26, marginRight: 16}}
            />
        </TouchableHighlight>
      )
    };
  };

  _handleMoreActions = () => {
    this.showActionSheet()
  }

  componentDidMount() {
    if (this.props.navigation.state.params !== undefined && 'id' in this.props.navigation.state.params) {
      this.setState({id: this.props.navigation.state.params.id})
      this.retriveCardInfoFromStore(this.props.navigation.state.params.id)
    }
  }

  retriveCardInfoFromStore(id) {
    const {availableCards} = this.props
    if (availableCards.allIds.indexOf(id) >= 0) {
      this.setState({card: availableCards.byId[id]})
      this.props.navigation.setParams({header: availableCards.byId[id]["name"], handleMoreActions: this._handleMoreActions})
    } else {
      console.log(availableCards.allIds, id)
    }
  }

  registerCard(id) {
    const {isLogin} = this.props
    if (isLogin) {
      this.props.actions.RegisterCard(id)
    }
  }

  render() {
    const { card } = this.state
    return (
      <ScrollView style={styles.container}>
        {card !== null && (
          <View style={{marginTop: 16}}>
            <WalletCardBig
              cardName={card.name}
              organizationName={card.issuer.name}
              backgroudImageUri={card.image}
              organizationImageUri={card.issuer.avatar}
              owned={card.owned}
              disable={card.disable}
              cardNumber={card.owned ? card.number : null}
              />
            <View style={{flexDirection: 'column', margin: 16}}>
              <View>
                <Text style={{fontSize: 20, marginBottom: 8}}>卡片描述</Text>
              </View>
              <Text style={{fontSize: 18, color: "#666", marginTop: 8}}>{card.description}</Text>
            </View>
            {(card.owned === false || card.disable === true) ? (
              <Button style={{marginHorizontal: 16}} onClick={()=> this.registerCard(card._id)}>领取</Button>
            ) : (
              <List className="my-list">
                <Item extra={"" + card.number}>卡号</Item>
              </List>
            )}
          </View>
        )}
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={title}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handleActionSheetPress}
          />
      </ScrollView>
    );
  }
}

const mapStatesToProps = (states) => {
  return {
    isLogin: states.auth.isLogin,
    availableCards: states.data.availableCards
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(Object.assign({}, DataActions), dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(CardDetailScreen);
