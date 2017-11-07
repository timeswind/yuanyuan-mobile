import React from 'react';
import {View, Text, FlatList} from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as DataActions from '../../redux/actions/data';
import { bindActionCreators } from 'redux';
import WalletCard from '../WalletCard'

class AvailableCards extends React.PureComponent {
  componentDidMount() {
    console.log(this.props)
  }

  goToCardDetail(id) {
    this.props.navigation.navigate('cardDetail', {id: id})
  }

  renderArticle = ({item}) => (
    <WalletCard
      cardName={item.name}
      organizationName={item.issuer.name}
      backgroudImageUri={item.image}
      organizationImageUri={item.issuer.avatar}
      owned={item.owned}
      goToCardDetail={() => this.goToCardDetail(item._id)}
      />
  )

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
    console.log('notOwnedIds', notOwnedIds)
    const notOwnedCardDataSource = notOwnedIds.map(function(id){
      return dataById[id]
    })

    const dataSource = ownedCardDataSource.concat(notOwnedCardDataSource)

    return (
      <View>
        <FlatList
          data={dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderArticle}
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
