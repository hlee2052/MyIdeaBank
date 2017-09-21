import React, {Component} from 'react'
import {View,
        StyleSheet,
        Text,
        TouchableOpacity} from 'react-native'
import Drawer from 'react-native-drawer'
import { Router, Scene } from 'react-native-router-flux'
import Main1 from './main1';
import QuoteExpanded from './quoteExpanded'
import timeStamp from './timeStamp'
import currentMap from './currentMap'


export default class Start extends Component {

constructor(){
super()
}
  render() {
      return (
        <Drawer

        tapToClose={true}
        type = 'overlay'
        elevation = {8}
        openDrawerOffset={.30}

        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })
      }
          ref={(ref) => this._drawer = ref} width={200}
          content={
            <View style={styles.drawerImage}>
              <View style={{backgroundColor:'green',  height: 54, justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.navFont}>Menu</Text>
              </View>
              <TouchableOpacity>
              <Text> My testing page</Text>
              </TouchableOpacity>

            </View>
            }
          >
          <View style={{backgroundColor:'black', flex:1}}>
          <Router   backButtonImage = {require('../imageFiles/back.png')}>
            <Scene key="main1" component={Main1} title="My Idea Bank"  titleStyle = {styles.navFont} navigationBarStyle={styles.navigationBar}/>
            <Scene key="quoteExpanded" component={QuoteExpanded} title={"My currnet Idea"} {...backButtonStyle}/>
            <Scene key="timeStamp" component={timeStamp} title="My Like History" {...backButtonStyle}/>
            <Scene key='currentMap' component = {currentMap} title = "created locaton" {...backButtonStyle}/>
          </Router>
          </View>
        </Drawer>
      )
  }
}

const styles = StyleSheet.create({
    navigationBar: {
      backgroundColor: 'rgb(15, 208, 63)',
    },

    navFont: {
      fontSize: 20,
      color: 'white'
    } ,

    drawerImage: {
      backgroundColor: 'white',
      flex: 1
    }
})

const backButtonStyle = {
  titleStyle: styles.navFont,
  navigationBarStyle: styles.navigationBar,
}
