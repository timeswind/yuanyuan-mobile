import React from 'react'
import {Text, ScrollView, RefreshControl} from 'react-native'
import NewsListView from '../components/Home/NewsListView'
import ExchangeRateView from '../components/ExchangeRateView/ExchangeRateView'
import { connect } from 'react-redux';
import * as ArticleActioins from '../redux/actions/article';
import { bindActionCreators } from 'redux';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  static navigationOptions = {
    title: '消息',
  };

  componentDidMount() {
    this.props.actions.fetchArticles()
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.actions.fetchArticles().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    return (
      <ScrollView
        scrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            />
        }>
        <NewsListView navigation={this.props.navigation}/>
      </ScrollView>
    )
  }
}

const mapStatesToProps = (states) => {
  return {
    article: states.article
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(Object.assign({}, ArticleActioins), dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(HomeScreen);
