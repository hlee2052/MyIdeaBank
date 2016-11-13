// @flow
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'

import common from './commonStyle'
import {Actions} from 'react-native-router-flux'

export default class QuoteExpanded extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex :1,  marginLeft:4}}>
          <Text style={{fontSize: 25}}> {(this.props.meow.taskValue)} ({(this.props.meow.num)})</Text>
          <Text style={{marginTop: 15}}>This idea was created on:</Text>
          <Text> {this.props.meow.currentDate}</Text>
        </View>
      <View style={{height: 54, }}>
         <View style={[common.bottomBackground]}>
         {/*use Actions.pop() */}
           <TouchableOpacity onPress={()=>Actions.timeStamp({meow: this.props.meow})}>
            <Image source={require('../imageFiles/history.png')} style = {{width: 50, height: 50, tintColor: 'white',
             backgroundColor: 'rgb(15, 208, 63)'}} />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>Actions.currentMap({meow: this.props.meow})}>
             <Image source={require('../imageFiles/map.png')} style = {{width: 50, height: 50, tintColor: 'white',
              backgroundColor: 'rgb(15, 208, 63)'}} />
           </TouchableOpacity>
         </View>
      </View>
     </View>
  )}
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 54,
  }
})
