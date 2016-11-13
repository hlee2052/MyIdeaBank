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
  AsyncStorage,
  Modal,
} from 'react-native';

//TODO consider using Modal?? to overlay?
import common from './commonStyle'
import {Actions} from 'react-native-router-flux'

export default class timeStamp extends Component {

  constructor(){
    super()
  }

  renderHistoryList(historyList) {
    return (historyList.map((singleTime) => {
        return (
          //TODO
          //each item start with Liked- or Hated- . I should using string splicing to determine whether its liked or
          // hated andd use that to replace the words with images instead.
          <View key={singleTime} style= {{marginBottom: 15}}>
            <Text style={{fontSize:20, color:'blue', fontFamily: 'Cochin', fontWeight:'bold' }}>
              {singleTime}
            </Text>
          </View>
        )}))}

 render() {
  return (
   <View style={styles.container}>
     {/*
      <View style={{flex:1}}>
        <View style={common.titleBackground}>
          <TouchableOpacity onPress={()=>Actions.quoteExpanded({meow: this.props.meow})} >
              <Image source={require('../imageFiles/back.png')} style = {{width: 50, height: 50, tintColor: 'white',
                backgroundColor: 'rgb(15, 208, 63)'}} />
          </TouchableOpacity>
          <Text style={common.titleText}> Your like history </Text>
        </View>
    </View>
      */}
      <View style={{flex : 1}}>
        <ScrollView style={{marginLeft: 25, marginTop : 58}}>
          {this.renderHistoryList(this.props.meow.listHistory)}
        </ScrollView>
      </View>
     </View>
  )}
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
})
