// @flow
import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  AsyncStorage,
  } from 'react-native'
import moment from 'moment'

import {Actions} from 'react-native-router-flux'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import common from './commonStyle'
//TODO consider using ParallaxScrollView
//TODO https://www.npmjs.com/package/react-native-parallax-scroll-view
//TODO consider using realmDB


var STORAGE_KEY = '@AsyncStorageExample:key';
export default class Main1 extends Component {
  constructor(){
  super()
  this.state = {
    tasks: [
          {id: 0, taskValue: 'placeHolder', num: 0, eachColor:'black'},
          {id: 1, taskValue: 'second', num: 0, eachColor:'black'}
                      ],
                 task: '',
                 initialPosition:0,
                credit:50};
  }

componentWillMount(){
   AsyncStorage.getItem('tasks')
    .then((response)=> {
     const parsedResponse = JSON.parse(response)
     if (parsedResponse){
      this.setState({tasks: parsedResponse})
    }
    })
  }

  componentDidUpdate(){
    this.setStorage()
  }

  setStorage(){
      AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks))
  }

  updateEachColor(meow){
    let index = this.state.tasks.indexOf(meow)
    let tasks = this.state.tasks
    let likeLevel = tasks[index].num

    if (likeLevel < 0 && likeLevel > -3){
      return '#FF6347'
    } else if (likeLevel <=-3) {
      return '#FF0000'
    } else if (likeLevel==0){
      return '#000000'
    } else if (likeLevel>0 && likeLevel <4){
      return '#00FF00'
    } else if (likeLevel>3 && likeLevel <8 ){
      return '#008000'
    } else if (likeLevel >= 8){
      return '#00FFFF'
    } else {
      return 'black'
    }
  }

  like(meow){
    //counterNum = this.state.tasks.historyCounter +=1
    this.addDateToHistory(meow, 'like')
    let index = this.state.tasks.indexOf(meow)
    let tasks = this.state.tasks

    tasks[index].num+=1
    tasks[index].historyCounter +=1
    this.setState({tasks})
  }

  hate(meow) {
    this.addDateToHistory(meow, 'hate')
    let index = this.state.tasks.indexOf(meow)
    let tasks = this.state.tasks
    tasks[index].num-=1
    tasks[index].historyCounter +=1

    if (tasks[index].num == -8) {
      alert('You disliked your ideas ' + tasks[index].num + ' times. It\'s time\
        to move on. Your idea has been deleted.')
      this.removeTask(meow)
    } else {
      this.setState({tasks})
    }
  }


getLocation(){
  alert('geoLocation() is called')
  navigator.geolocation.getCurrentPosition(
    (position) => {
    //  var initialPosition = JSON.stringify(position);
    let myDateStamp =  moment()
    let dateChecker = new Date()
  let  lon = position.coords.longitude
  let  lat = position.coords.latitude
    alert(lon + "and" + lat)
     let taskConcat = this.state.tasks.concat([{id: this.state.tasks.length,
       taskValue: this.state.task,
       eachLat:lat,
       eachLon:lon,
       num: 0, eachColor:'blue', listHistory:[], historyCounter:0, currentDate:myDateStamp.utc().format('MMMM-Do-YYYY')},
     ])
     this.setState({tasks: taskConcat})
    //  this.setState({initialPosition});
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

  }

  addTask() {
    this.getLocation()
    this.setStorage();
  }

  removeTask(meow) {
    let indexMeow = this.state.tasks.indexOf(meow)
    let splicedMeow = this.state.tasks
    splicedMeow.splice(indexMeow, 1)
    this.setState({tasks: splicedMeow})
    this.setStorage()
  }


  test1() {
    alert('test')
  }

  addDateToHistory(meow, likeOrHate){
    let eachTimer = new moment()
    meowDate=eachTimer.toJSON()

    if (likeOrHate == 'like') {
      let index = this.state.tasks.indexOf(meow)
      let tasksVar = this.state.tasks

      tasksVar[index].listHistory[tasksVar[index].historyCounter] = 'Liked on: ' + JSON.stringify(meowDate)
      this.setState(tasksVar)
    }
    if (likeOrHate =='hate'){
      let index = this.state.tasks.indexOf(meow)
      let tasksVar = this.state.tasks

      tasksVar[index].listHistory[tasksVar[index].historyCounter] = 'Hated on: '+JSON.stringify(meowDate)
      this.setState(tasksVar)
    }

   //TODO: using helper function somehow loses 'this' context...? need to fix
    /*
    var helper = function() {
      let index = this.state.tasks.indexOf(meow)
      alert(this.state.tasks.indexOf(meow))
      let tasks = this.state.tasks
      tasks[index].eachTime = meowDate
      this.setState(tasks)
    }
    */

    /*
    let index = this.state.tasks.indexOf(meow)
    let tasks = this.state.tasks
    tasks[index].eachTime = meowDate
    this.setState(tasks)
    */
  }


  renderList(tasks) {
    let i = 0
    let eachColor = 'black'
    return (
      tasks.map((meow) => {
        eachColor = this.updateEachColor(meow)
        return (
          <View style={styles.broaderTask} key={meow.id} >
            <TouchableOpacity  style= {styles.task} onPress={()=>Actions.quoteExpanded({meow})}>
              <View style={{flex:1}} contentContainerStyle={{width: 1000, height: 1000}}>
                <View style={{flex:1}} >
                  <Text style={{fontSize:20, color:eachColor}}>
                    {meow.eachColor}  {meow.taskValue}({meow.num})
                   </Text>
                 </View>
              </View>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={()=>this.removeTask(meow)}>
                <Image source={require('../imageFiles/delete.png')} style = {{width: 30, height: 30, tintColor: 'purple',
                  marginBottom: 13}} />
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.like(meow)}>
                <Image source={require('../imageFiles/like.png')} style = {{width: 30, height: 30, tintColor: 'blue'}} />
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.hate(meow)}>
                <Image source={require('../imageFiles/hate.png')} style = {{width: 30, height: 30, tintColor: 'red'}} />
              </TouchableOpacity>
            </View>
          </View>
        )
      })
    )
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={common.titleBackground}>
          <TouchableOpacity onPress={()=>Actions.main1()} >
            <Image source={require('../imageFiles/menu.png')} style = {{width: 50, height: 50, tintColor: 'white',
              backgroundColor: 'rgb(15, 208, 63)', alignItems:'center'}} />
          </TouchableOpacity>
          <Text style={common.titleText}> My Idea Bank </Text>
        </View>
        <ScrollView style={{flex:1}}>
          <Text style={styles.descriptionText}>
            Test
            {this.state.initialPosition}
          </Text>
          <TextInput
            style = {styles.input1}
            placeholder='Add a quote...'
            onChangeText={(text) => {
              this.setState({task: text})
            }}
            onSubmitEditing={()=>this.addTask()} />

            {this.renderList(this.state.tasks)}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  input1: {
    marginLeft: 20,
    marginRight: 90,
    marginBottom: 10,
  },
  broaderTask: {
    flexDirection: 'row',
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height : 110,
    width: 180,
    flex:1,
    borderWidth: 2,
    borderRadius: 4,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 50,
    borderColor: 'green',
  },

  descriptionText: {
    fontSize: 12,
    color: 'blue',
    backgroundColor: 'rgba(0,255,255, 0.3)',
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
})
