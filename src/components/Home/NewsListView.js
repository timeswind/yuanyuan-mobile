import React from 'react';
import {ListView, View, Text, TouchableHighlight, Image} from 'react-native';
import { connect } from 'react-redux';
import * as ArticleActioins from '../../redux/actions/article';
import { bindActionCreators } from 'redux';

class NewsListView extends React.Component {
  componentDidMount() {
    requestAnimationFrame(() => {
      this.refs._list.scrollTo({x: 1, y: 0, animated: false})
    });
  }

  renderArticle(article, navigation) {
    return (
      <TouchableHighlight onPress={() => navigation.navigate('newsDetail', {article: article})} underlayColor="#E8E8E8" style={{backgroundColor: "#fff"}}>
        <View style={{flexDirection: "row", paddingLeft: 16, paddingTop: 8, paddingBottom:8, paddingRight: 8, borderBottomWidth: 0.5, borderColor: "#ddd"}}>
          <View style={{flexDirection: "column", flex: 1}}>
            <Text style={{fontSize: 18, marginBottom: 8}}>{article.title}</Text>
            <Text style={{fontSize: 14, color: "#666", marginTop: 'auto'}}>{article.user.name}</Text>
          </View>
          <Image style={{borderRadius: 0, width: 100, height: 80}} source={{uri: 'http://placehold.it/100x80'}}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const {articles} = this.props.article
    const dataSource = ds.cloneWithRows(articles.dataSource)
    return (
      <View>
        <ListView
          ref="_list"
          enableEmptySections={true}
          removeClippedSubViews={false}
          dataSource={dataSource}
          renderRow={(article) => this.renderArticle(article, this.props.navigation)}
          />
      </View>
    );
  }
}



const mapStatesToProps = (states) => {
  return {
    article: states.article
  };
}

export default connect(mapStatesToProps, null)(NewsListView);
