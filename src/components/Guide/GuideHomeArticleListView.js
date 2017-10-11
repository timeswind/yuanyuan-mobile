import React from 'react';
import {ListView, View, Text, TouchableHighlight} from 'react-native';

class GuideHomeArticleListView extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([{title: 'title1', abbr: "bala bala bala bala bala bala bala"}, {title: 'title2', abbr: "bala bala bala bala bala bala bala"}]),
    };
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.refs._list.scrollTo({x: 1, y: 0, animated: false})
    });
  }

  renderArticle(article, navigation) {
    return (
      <TouchableHighlight onPress={() => navigation.navigate('newsDetail')} underlayColor="#E8E8E8" style={{backgroundColor: "#fff"}}>
        <View style={{flexDirection: "column", padding: 16, borderBottomWidth: 0.5, borderColor: "#ddd"}}>
          <Text style={{fontSize: 20, marginBottom: 8}}>{article.title}</Text>
          <Text style={{color: "#999"}}>{article.abbr}</Text>
          <Text style={{color: "#333", textAlign: "right"}}>Mingtian Yang</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <Text style={{paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, backgroundColor: "#2196F3", color: "#fff"}}>最新干货</Text>
        <ListView
          ref="_list"
          removeClippedSubViews={false}
          dataSource={this.state.dataSource}
          renderRow={(article) => this.renderArticle(article, this.props.navigation)}
          />
      </View>
    );
  }
}

export default GuideHomeArticleListView
