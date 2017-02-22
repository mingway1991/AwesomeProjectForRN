import React, { Component, PropTypes } from 'react';
import { 
  AppRegistry, 
  Text, 
  View, 
  Image, 
  StyleSheet, 
  ListView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';

import WebViewComponent from './WebViewController';
import NavigationBar from '../common/NavigationBarCommon';

var REQUEST_URL = 'https://api.douban.com/v2/movie/coming_soon?city=上海'

class MovieListComponent extends Component {

  /*声明参数*/
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loaded: false,
      isRefreshing: false
    };
    /*_fetchData中需要调用this.setState，添加bind(this)*/
    this._fetchData = this._fetchData.bind(this);
  }

  /*组件加载完成，获取数据*/
  componentDidMount() {
    this._fetchData();
  }

  /*获取数据*/
  _fetchData() {
    {this.setState({isRefreshing: true})};
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.subjects),
          loaded: true,
          isRefreshing: false,
        });
      })
      .done();
  }

  /*渲染*/
  render() {
    if (!this.state.loaded) {
      return this._renderLoadingView();
    }
    return (
      <View style={styles.parentView}>
        <NavigationBar title='豆瓣即将上映电影'/> 
        <ListView 
          dataSource={this.state.dataSource} 
          renderRow={this._renderRow.bind(this)} 
          style={styles.listView}
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._fetchData}
            tintColor="#666666"
            title="加载中..."
            titleColor="#000000"
            colors={['#FF0000', '#00FF00', '#0000FF']}
            progressBackgroundColor="#000000"
          >
          </RefreshControl>
        }>
        >
        </ListView>
      </View>
    );
  }

  /*渲染加载视图*/
  _renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          正在加载影片列表中...
        </Text>
      </View>
    );
  }

  /*渲染cell*/
  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity onPress = {() =>this._pressRow(rowData)} underlayColor = "transparent" >
        <View style={styles.row}>
          <Image
            source={{uri: rowData.images.medium}}
            style={styles.thumbnail}
          >
          </Image>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{rowData.title}</Text>
            <Text style={styles.content}>年份: {rowData.year}</Text>
            <Text style={styles.content}>类型: {rowData.genres.join("、")}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  /*cell点击方法*/
  _pressRow(rowData, sectionID, rowID) {
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        name: 'WebViewComponent',
        component: WebViewComponent,
        passProps: {
          url: rowData.alt,
          title: rowData.title,
        }
      });
    }
  }
}

var styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#F5FCFF'
    },
    row: {  
      flexDirection: 'row',  
      justifyContent: 'center',  
      padding: 10,  
      backgroundColor: '#F5FCFF',  
    },
    rightContainer: {
      flex: 1,
    },
    title: {
      paddingLeft: 15,
      fontSize: 16,
      marginBottom: 8,
      textAlign: 'left',
    },
    content: {
      paddingLeft: 15,
      fontSize: 14,
      textAlign: 'left',
    },
    thumbnail: {
      marginLeft: 10,
      width: 64,
      height: 100,
      backgroundColor: '#EFEFEF',
    },
    listView: {
      backgroundColor: '#F5FCFF',
    },
    parentView: {
      flex: 2
    }
});


export default MovieListComponent;