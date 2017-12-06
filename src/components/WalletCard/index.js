import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native'
import * as ToolActions from '../../redux/actions/tool';
import { bindActionCreators } from 'redux';
import { Card, WingBlank, WhiteSpace, Button } from 'antd-mobile';

const styles = StyleSheet.create({
  cardCompanyImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#fff"
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  innerFrame: {
    padding: 16,
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, .1)',
  },
  cardWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius: 6,
    overflow: 'hidden'
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
  },
  /*register_card_button: {
    marginLeft: 'auto',
    marginTop: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'center',
  }*/
});

class WalletCard extends React.Component {
  render () {
    const { backgroudImageUri, cardName, organizationName, organizationImageUri, owned, disable } = this.props
    return (
      <WingBlank size="lg">
        <WhiteSpace size="sm"/>
        <TouchableHighlight style={styles.cardWrapper} onPress={this.props.goToCardDetail}>
          <View style={styles.cardWrapper}>
            <ImageBackground style={styles.card} source={{uri: backgroudImageUri}}>
              <View style={styles.innerFrame}>
                <Image style={styles.cardCompanyImage} source={{uri: organizationImageUri}}/>
                <View style={{flexDirection: 'column', marginLeft: 16}}>
                  <Text style={styles.organizationName}>
                    {organizationName}
                  </Text>
                  <Text style={styles.cardName}>
                    {cardName}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </TouchableHighlight>
        {/*(owned && !disable) ? (null) : (
          <Button style={styles.register_card_button} onClick={this.props.goToCardDetail}>领取</Button>
        ) */}
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
  organizationImageUri: PropTypes.string,
  owned: PropTypes.bool,
  disable: PropTypes.bool
}

WalletCard.defaultProps = {
  cardName: 'cardName',
  organizationName: 'organizationName',
  backgroudImageUri: 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/premier-rewards-gold.png',
  organizationImageUri: 'http://placehold.it/100x100',
  owned: false,
  disable: false,
};

export default WalletCard;
