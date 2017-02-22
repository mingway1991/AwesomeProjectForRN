import React, { Component } from 'react';
import { 
  View,
  WebView,
  StyleSheet
} from 'react-native';

import NavigationBar from '../common/NavigationBarCommon';

var WEBVIEW_REF = 'webview';

export default class WebViewComponent extends Component {

	constructor(props) {
        super(props);
        this.state = {
            url: '',
            title: '',
            backButtonEnabled: false,
            status: '',
            loading: false
        }
    }

    componentDidMount() {
        /*这里获取从MovieList传递过来的参数: url*/
        this.setState({
            url: this.props.url,
            title: this.props.title
        });
    }
	/*渲染*/
  	render() {
  		return (
      		<View style={{flex:1}}>
          {
            this.state.backButtonEnabled ? <NavigationBar title={this.state.title} leftImage1={require('../assets/navigationBackItemWrite@3x.png')} leftAction1={this._goBack} leftImage2={require('../assets/navigationCloseItemWrite@3x.png')} leftAction2={this._backAction} />
            : <NavigationBar title={this.state.title} leftImage1={require('../assets/navigationBackItemWrite@3x.png')} leftAction1={this._backAction} />
          }
        		<WebView 
        			ref={WEBVIEW_REF}
        			automaticallyAdjustContentInsets={false}
        			style={styles.webview_style}
        			source={{uri: this.state.url}}
         			startInLoadingState={true}
          		domStorageEnabled={true}
          		javaScriptEnabled={true}
          		scalesPageToFit={true}
              onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
              onNavigationStateChange={this._onNavigationStateChange}
          		>
        		</WebView>
      		</View>
    	);
  	}

    _backAction = () => {
      const { navigator } = this.props;
      if (navigator) {
        navigator.pop();
      };
    }

  	_goBack = () => {
    	this.refs[WEBVIEW_REF].goBack();
 	  };

  	_goForward = () => {
    	this.refs[WEBVIEW_REF].goForward();
  	};

  	_reload = () => {
    	this.refs[WEBVIEW_REF].reload();
  	};

    _onShouldStartLoadWithRequest = (event) => {
      return true;
    }

    _onNavigationStateChange = (navState) => {
      this.setState({
        backButtonEnabled: navState.canGoBack,
        status: navState.title,
        loading: navState.loading
      });
    };
}

var styles = StyleSheet.create({
    webview_style:{ 
      flex: 2,
      backgroundColor:'#00ff00' 
    }
});
