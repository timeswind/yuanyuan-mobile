import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import getRNDraftJSBlocks from 'react-native-draftjs-render';
import moment from 'moment';
import 'moment/locale/zh-cn';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
});

const customStyles = StyleSheet.flatten({
  unstyled: {
    fontSize: 18,
    fontWeight: 'normal',
    letterSpacing: -0.75,
    lineHeight: 32,
    marginBottom: 21,
  },
  link: {
    color: '#c4170c',
    fontWeight: 'bold',
    textDecorationLine: 'none',
  },
  unorderedListItemContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  unorderedListItemBullet: {
    marginRight: 18,
    position: 'relative',
    top: 14,
    width: 6,
    height: 6,
    alignSelf: 'flex-start',
  },
  'unordered-list-item': {
    fontSize: 18,
    lineHeight: 32,
    alignSelf: 'flex-start',
    flex: 1,
  },
  orderedListContainer: {
    marginBottom: 16,
  },
  orderedListItemNumber: {
    fontSize: 18,
    lineHeight: 32,
    marginRight: 11,
    alignSelf: 'flex-start',
    color: '#c4170c',
  },
  'ordered-list-item': {
    alignSelf: 'flex-start',
    fontSize: 18,
    lineHeight: 32,
    flex: 1,
  },
  'code-block': {
    backgroundColor: '#e2e2e2',
  },
  blockquote: {
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 33,
    paddingTop: 24,
    marginBottom: 24,
    fontSize: 33,
    letterSpacing: -2,
  },
  viewAfterList: {
    marginBottom: 32,
  },
});



function atomicHandler (entityMap) {
  if (entityMap && Object.keys(entityMap).length > 0) {
    return function (item) {
      switch (item.type) {
        case "atomic":
        if (item.entityRanges.length > 0) {
          var imageURL = entityMap[item.entityRanges[0]["key"]]["data"]["src"]
          if (imageURL.indexOf("yuanyuanofficial.s3.amazonaws.com") >= 0) {
            imageURL = imageURL.replace("yuanyuanofficial.s3.amazonaws.com", "yuanyuan.imgix.net") + "?w=600"
          }
          console.log(imageURL)
          return (
            <View key={item.entityRanges[0]["key"]} style={{ flex: 1, paddingTop: 8, paddingBottom: 8 }}>
              <Image
                style={{ height: 200 }}
                source={{ uri: imageURL }}
                resizeMode={"contain"}/>
            </View>
          );
        } else {
          return null
        }
        default:
        return null;
      }
    }
  } else {
    return function () {
      return null
    }
  }
};

export default class NewsDetailScreen extends Component {
  static navigationOptions = {
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: "#fff"
    }
  }

  state = {
    article: {},
    content: {}
  }

  renderArticleCreatedAtTime(date) {
    return moment(date).format("YYYY-MM-DD") + "  "
  }

  componentDidMount() {
    if (this.props.navigation.state.params !== undefined && 'article' in this.props.navigation.state.params && 'content' in this.props.navigation.state.params.article) {
      const content = JSON.parse(this.props.navigation.state.params.article.content)
      console.log(this.props.navigation.state.params.article)
      this.setState({article: this.props.navigation.state.params.article, content: content})
    }
  }

  render() {
    const params = {
      contentState: this.state.content,
      customStyles,
      atomicHandler: atomicHandler(this.state.content.entityMap)
    };

    const blocks = getRNDraftJSBlocks(params);
    console.log(this.state.article.author)
    return (
      <ScrollView style={styles.container}>
        <View style={{marginTop: 16, marginBottom: 4, paddingBottom: 8}}>
          <Text style={{fontSize: 24}}>{this.state.article.title}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 8}}>
          <Text style={{fontSize: 18, color: '#666'}}>
            {this.state.article.created_at && this.renderArticleCreatedAtTime(this.state.article.created_at)}
          </Text>
          {this.state.article.author !== '' && (
            <Text style={{fontSize: 18, color: '#666', marginRight: 8}}>
              {this.state.article.author}
            </Text>
          )}
          <Text style={{fontSize: 18, color: '#666'}}>
            {this.state.article.user && this.state.article.user.name}
          </Text>
        </View>
        <View>{blocks}</View>
      </ScrollView>
    );
  }
}
