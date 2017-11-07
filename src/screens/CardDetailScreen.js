import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import * as DataActions from '../redux/actions/data';
import { bindActionCreators } from 'redux';
import WalletCardBig from '../components/WalletCard/big.js';
import { Button } from 'antd-mobile';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: '#feffff',
  },
});

class CardDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#feffff",
        elevation: 0,
        shadowOpacity: 0
      }
    };
  };

  state = {
    id: "null",
    card: null
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
      this.props.navigation.setParams({header: availableCards.byId[id]["name"]})
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
              cardNumber={card.owned ? card.number : null}
              />
            <View style={{flexDirection: 'column', margin: 16}}>
              <View style={{borderBottomWidth: 1, borderColor: "#aaa"}}>
                <Text style={{fontSize: 20, marginBottom: 8}}>卡片描述</Text>
              </View>
              <Text style={{fontSize: 18, color: "#666", marginTop: 8}}>{card.description}</Text>
            </View>
            {card.owned === false ? (
              <Button style={{marginHorizontal: 16}} onClick={()=> this.registerCard(card._id)}>领取</Button>
            ) : (
              <View style={{margin: 16}}>
                <Text>卡号: {card.number}</Text>
              </View>
            )}
          </View>
        )}
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
