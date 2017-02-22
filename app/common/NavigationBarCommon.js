import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // leftTitle和leftImage 优先判断leftTitle (即 文本按钮和图片按钮优先显示文本按钮)
      const { title, leftTitle1, leftImage1, leftAction1, leftTitle2, leftImage2, leftAction2, rightTitle, rightImage, rightAction } = this.props;
        return (
            <View style={[styles.barView, this.props.style]}>
              <View style={ styles.showView }>
                {
                        leftTitle1
                        ?
                        <TouchableOpacity style={styles.leftNav1} onPress={ ()=>{leftAction1()} }>
                            <View>
                                <Text style={styles.barButton}>{leftTitle1}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        (
                            leftImage1
                            ?
                            <TouchableOpacity style={styles.leftNav1} onPress={ ()=>{leftAction1()} }>
                                <View>
                                    <Image source={ leftImage1 }/>
                                </View>
                            </TouchableOpacity>
                            : null
                        )
                }
                {
                        leftTitle2
                        ?
                        <TouchableOpacity style={styles.leftNav2} onPress={ ()=>{leftAction2()} }>
                            <View>
                                <Text style={styles.barButton}>{leftTitle2}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        (
                            leftImage2
                            ?
                            <TouchableOpacity style={styles.leftNav2} onPress={ ()=>{leftAction2()} }>
                                <View>
                                    <Image source={ leftImage2 }/>
                                </View>
                            </TouchableOpacity>
                            : null
                        )
                }
                {
                        title ?
                        <Text style={styles.title}>{title || ''}</Text>
                        : null
                }
                {
                        rightTitle ?
                        <TouchableOpacity style={styles.rightNav} onPress={ ()=>{rightAction()} }>
                            <View style={{alignItems: 'center'}}>
                              <Text style={styles.barButton}>{rightTitle}</Text>
                            </View>
                        </TouchableOpacity>
                        : (rightImage ?
                        <TouchableOpacity style={styles.rightNav} onPress={ ()=>{rightAction()} }>
                          <View style={{alignItems: 'center'}}>
                            <Image source={ rightImage }/>
                          </View>
                        </TouchableOpacity>
                        : null
                        )
                }

            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    barView: {
        height: Platform.OS === 'android' ? 44 : 64,
        backgroundColor: '#4E78E7',
    },
    showView: {
      flex: 1,
      flexDirection: 'row',
      marginTop: Platform.OS === 'android' ? 0 : 20,
      height: 44,
    },
    title: {
      marginHorizontal: 8,
      alignSelf: 'center',
      justifyContent: 'center',
      color: 'white',
      marginLeft: 8,
      fontSize: 20.0,
    },
    leftNav1: {
      position: 'relative',
      marginTop: 8,
      marginBottom: 8,
      marginLeft: 0,
      maxWidth: 60,
      justifyContent: 'center',
    },
    leftNav2: {
      position: 'relative',
      marginTop: 8,
      marginBottom: 8,
      marginLeft: 0,
      maxWidth: 60,
      justifyContent: 'center',
    },
    rightNav: {
      position: 'absolute',
      right: 8,
      top: 8,
      bottom: 8,
      maxWidth: 60,
      justifyContent: 'center',
      justifyContent: 'center',
    },
    barButton: {
        color: 'white',
        fontSize: 18
    },
})



export default NavigationBar