import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import * as ToolActions from '../../redux/actions/tool';
import { bindActionCreators } from 'redux';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

const styles = StyleSheet.create({
  cardCompanyImage: {
    height: 50,
    borderRadius: 25,
    width: 50,
    borderWidth: 1,
    borderColor: "#fff"
  },
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cardWrapper: {
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  organizationName: {
    fontSize: 14,
    color: "#fff",
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    paddingVertical: 4,
    backgroundColor: 'transparent'
  },
  cardName: {
    fontSize: 22,
    marginTop: 0,
    color: "#fff",
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    paddingVertical: 4,
    backgroundColor: 'transparent'
  }

});

class WalletCard extends React.Component {
  render () {
    const { backgroudImageUri, cardName, organizationName, organizationImageUri } = this.props
    return (
      <WingBlank size="lg">
        <WhiteSpace size="sm"/>
        <View style={styles.cardWrapper}>
          <ImageBackground style={styles.card} source={{uri: backgroudImageUri}}>
            <Image style={styles.cardCompanyImage} source={{uri: organizationImageUri}}/>
            <View style={{flexDirection: 'column', marginLeft: 16}}>
              <Text style={styles.organizationName}>
                {organizationName}
              </Text>
              <Text style={styles.cardName}>
                {cardName}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <WhiteSpace size="sm" />
      </WingBlank>
    )
  }
}

// const mapStatesToProps = (states) => {
//   return {
//     tool: states.tool
//   };
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch,
//     actions: bindActionCreators(Object.assign({}, ToolActions), dispatch)
//   };
// }

WalletCard.propTypes = {
  cardName: PropTypes.string,
  organizationName: PropTypes.string,
  backgroudImageUri: PropTypes.string,
  organizationImageUri: PropTypes.string
}

WalletCard.defaultProps = {
  cardName: 'cardName',
  organizationName: 'organizationName',
  backgroudImageUri: 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/premier-rewards-gold.png',
  organizationImageUri: 'http://placehold.it/100x100'
};

export default WalletCard;
