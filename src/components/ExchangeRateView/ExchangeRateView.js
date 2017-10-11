import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux';
import * as ToolActions from '../../redux/actions/tool';
import { bindActionCreators } from 'redux';

class ExchangeRateView extends React.Component {

  componentDidMount() {
    this.props.actions.fetchExchangeRate()
  }

  render () {
    return (
      <TouchableHighlight onPress={() => {}} underlayColor="#ddd" style={{backgroundColor: "#eee"}}>
        <View style={{padding: 12, borderBottomWidth: 0.5, borderColor: "#ddd", margin: 'auto'}}>
          {this.props.tool.USDtoCNYrate !== 0 && (
            <View style={{flexDirection: 'row',backgroundColor: "transparent"}}>
              <View style={{marginRight: 16}}>
                <Text style={{color: "#666", fontSize: 18}}>中美汇率</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: "#333", fontSize: 14}}>CNY    </Text>
                <Text style={{color: "#333", fontSize: 14}}>1  :  {this.props.tool.USDtoCNYrate}</Text>
                <Text style={{color: "#333", fontSize: 14}}>    USD</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableHighlight>
    )
  }
}

const mapStatesToProps = (states) => {
  return {
    tool: states.tool
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(Object.assign({}, ToolActions), dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ExchangeRateView);
