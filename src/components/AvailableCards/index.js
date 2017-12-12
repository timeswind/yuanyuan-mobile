import React from 'react';
import {View, Text, FlatList} from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as DataActions from '../../redux/actions/data';
import { bindActionCreators } from 'redux';
import WalletCard from '../WalletCard'

class AvailableCards extends React.PureComponent {
  goToCardDetail(id) {
    this.props.navigation.navigate('cardDetail', {id: id})
  }

  renderArticle = ({item}) => {
    if (item._id === 'notOwnedHeader') {
      return (
        <View style={{
            backgroundColor: '#e9e9ef',
            paddingVertical: 16,
            paddingLeft: 16,
            marginVertical: 8,
          }}>
          <Text style={{color: "#888", fontSize: 16}}>尚未领取</Text>
        </View>
      )
    } else if (item._id === 'ownedHeader') {
      return (
        <View style={{
            backgroundColor: '#e9e9ef',
            paddingVertical: 16,
            paddingLeft: 16,
            marginBottom: 8
          }}>
          <Text style={{color: "#888", fontSize: 16}}>活跃卡片</Text>
        </View>
      )
    } else {
      return (
        <WalletCard
          style={{paddingHorizontal: 8}}
          cardName={item.name}
          organizationName={item.issuer.name}
          backgroudImageUri={item.image}
          organizationImageUri={item.issuer.avatar}
          owned={item.owned}
          disable={item.disable}
          goToCardDetail={() => this.goToCardDetail(item._id)}
          />
      )
    }
  }

  _keyExtractor = (item, index) => item._id;

  render() {
    const { ownedIds } = this.props.availableCards
    const dataById = this.props.availableCards.byId
    const ownedCardDataSource = this.props.availableCards.ownedIds.map(function(id){
      return dataById[id]
    })
    const notOwnedIds = this.props.availableCards.allIds.filter(function(id){
      return ownedIds.indexOf(id) === -1
    })
    const notOwnedCardDataSource = notOwnedIds.map(function(id){
      return dataById[id]
    })
    var dataSource = [{_id: 'ownedHeader'}].concat(ownedCardDataSource)
    dataSource = dataSource.concat([{_id: 'notOwnedHeader'}])
    dataSource = dataSource.concat(notOwnedCardDataSource)
    return (
      <View>
        <FlatList
          data={dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderArticle}
          style={{paddingHorizontal: 0, paddingBottom: 16}}
          />
      </View>
    )
  }
}

const mapStatesToProps = (states) => {
  return {
    availableCards: states.data.availableCards
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(Object.assign({}, DataActions), dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(AvailableCards)
