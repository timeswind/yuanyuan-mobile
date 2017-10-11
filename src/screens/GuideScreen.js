import React from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TouchableHighlight, RefreshControl} from 'react-native'
import GuideHomeArticleListView from '../components/Guide/GuideHomeArticleListView'
import NewsListView from '../components/Home/NewsListView'
import ExchangeRateView from '../components/ExchangeRateView/ExchangeRateView'
import { connect } from 'react-redux';
import * as ArticleActioins from '../redux/actions/article';
import { bindActionCreators } from 'redux';

const styles = StyleSheet.create({
  containter: {
    height: '100%'
  },
  topNavBarOne: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: '#ddd'
  },
  topNavBarTwo: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ddd'
  },
  topNavBlock: {
    width: "25%",
    height: 100,
    borderWidth: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topNavBlockText: {
    marginTop: 8,
    textAlign: 'center'
  },
  navImage: {
    height: 50,
    borderRadius: 25,
    width: 50
  },
  contentContainer: {
    paddingVertical: 0
  }
});

class GuideScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.actions.fetchArticles()
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.actions.fetchArticles().then(() => {
      this.setState({refreshing: false});
    });
  }

  static navigationOptions = {
    title: '干货',
  };

  render() {
    return(
      <View style={styles.containter}>
        <ScrollView scrollEnabled={true} contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              />
          }>
          <View style={{backgroundColor: "#fff"}}>
            <View style={styles.topNavBarOne}>
              <TouchableHighlight
                underlayColor="#E8E8E8"
                style={styles.topNavBlock}
                onPress={() => this.props.navigation.navigate('guideMap')}>
                <View>
                  <Image style={styles.navImage} source={require('../images/mapNavIcon.png')}/>
                  <Text style={styles.topNavBlockText}>地图</Text>
                </View>
              </TouchableHighlight>
              <View style={styles.topNavBlock}>
                <Image style={styles.navImage} source={{uri: 'http://placehold.it/100x100'}}/>
                <Text style={styles.topNavBlockText}>交通</Text>
              </View>
              <View style={styles.topNavBlock}>
                <Image style={styles.navImage} source={{uri: 'http://placehold.it/100x100'}}/>
                <Text style={styles.topNavBlockText}>社团</Text>
              </View>
              <View style={styles.topNavBlock}>
                <Image style={styles.navImage} source={{uri: 'http://placehold.it/100x100'}}/>
                <Text style={styles.topNavBlockText}>美食</Text>
              </View>
            </View>
            <View style={styles.topNavBarTwo}>
              <View style={styles.topNavBlock}>
                <Image style={styles.navImage} source={{uri: 'http://placehold.it/100x100'}}/>
                <Text style={styles.topNavBlockText}>住宿</Text>
              </View>
              <View style={styles.topNavBlock}>
                <Image style={styles.navImage} source={{uri: 'http://placehold.it/100x100'}}/>
                <Text style={styles.topNavBlockText}>学术</Text>
              </View>
              <View style={styles.topNavBlock}>
                <Image style={styles.navImage} source={{uri: 'http://placehold.it/100x100'}}/>
                <Text style={styles.topNavBlockText}>新生</Text>
              </View>
              <View style={styles.topNavBlock}>
                <Image style={styles.navImage} source={{uri: 'http://placehold.it/100x100'}}/>
                <Text style={styles.topNavBlockText}>更多</Text>
              </View>
            </View>
          </View>
          {/*  <View style={{flex: 1}}>
          <GuideHomeArticleListView navigation={this.props.navigation}/>
          </View> */}
          <NewsListView navigation={this.props.navigation}/>
        </ScrollView>
      </View>
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

export default connect(mapStatesToProps, mapDispatchToProps)(GuideScreen);
