
'use strict';
import React, { Component } from 'react';
import { 
  AppRegistry, 
  View,
  Navigator
} from 'react-native';

//github地址：https://github.com/exponent/react-native-tab-navigator.git
import TabNavigator from 'react-native-tab-navigator';
import HotMovieListComponent from './components/HotMovieListViewController';
import WillMovieListComponent from './components/WillMovieListViewController';

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'hot'
    };
  }

  _renderScene = (route, navigator) => {
    return(
      <route.component navigator={navigator} {...route.passProps} />
    );
  }

  handleTabBar = (state) => {
    this.setState({
      tabBarHeight: state ? AppConfig.tabBarHeight : 0
    })
  }

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          tabBarStyle={{height: this.state.tabBarHeight}}
          sceneStyle={{paddingBottom: this.state.tabBarHeight}}
          selected={this.state.selectedTab === 'hot'}
          title="正在热映"
          //renderIcon={() => <Image source={...} />}
          //renderSelectedIcon={() => <Image source={...} />}
          //badgeText="1"
          onPress={() => this.setState({ selectedTab: 'hot' })}>
          <Navigator
            configureScene={ this._configureScene }
            initialRoute={{
              component: HotMovieListComponent,
              tabBar: {
                hide: () => this.handleTabBar(false),
                show: () => this.handleTabBar(true)
              }
            }}
            renderScene={this._renderScene}
          >
          </Navigator>
        </TabNavigator.Item>
        <TabNavigator.Item
          tabBarStyle={{height: this.state.tabBarHeight}}
          sceneStyle={{paddingBottom: this.state.tabBarHeight}}
          selected={this.state.selectedTab === 'will'}
          title="即将上映"
          //renderIcon={() => <Image source={...} />}
          //renderSelectedIcon={() => <Image source={...} />}
          //renderBadge={() => <CustomBadgeView />}
          onPress={() => this.setState({ selectedTab: 'will' })}>
          <Navigator
            configureScene={ this._configureScene }
            initialRoute={{
              component: WillMovieListComponent,
              tabBar: {
                hide: () => this.handleTabBar(false),
                show: () => this.handleTabBar(true)
              }
            }}
            renderScene={this._renderScene}
          >
          </Navigator>
        </TabNavigator.Item>
      </TabNavigator>
          );
    }
}

export default Root;