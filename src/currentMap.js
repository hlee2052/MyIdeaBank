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
} from 'react-native';

//TODO consider using Modal?? to overlay?
import common from './commonStyle'
import {Actions} from 'react-native-router-flux'
import GeolocationExample from './GeolocationExample'
import GoogleStaticMap from 'react-native-google-static-map'

export default class currentMap extends Component {
  constructor(){
    super()
    this.state = {
      geocoderAPI: 'test',
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      serverJSON: ''
    }
  }
  //this.props.meow.eachLon = position.coords.longitude
  //this.props.meow.eachLat = position.coords.latitude

  componentDidMount() {
    this.reverseGeoCoderAPI()
  }

  async reverseGeoCoderAPI() {
    this.state.geocoderAPI ='https://maps.googleapis.com/maps/api/geocode/json?latlng='
    + this.props.meow.eachLat+','+this.props.meow.eachLon+'&key=AIzaSyDrwNIpdARXo4GAHbztsp7s-Z_jFuh2G2I'
    try {
      let response = await fetch(this.state.geocoderAPI)
      let responseJson = await response.json()
    //  let responseJsonText = JSON.stringify(responseJson)
      let formattedResponse = responseJson.results[0].address_components[2].long_name
      let responseJsonText = JSON.stringify(formattedResponse)
      this.setState({serverJSON: responseJsonText})
    } catch(error) {
      console.error(error)
    //  this.setState({serverJSON: "face"})
      alert('Make sure you have GPS on or your location is not supported by google reverse geocoder')
    }
  }
    render() {
    //let geocoderAPI ='https://maps.googleapis.com/maps/api/geocode/json?latlng='+ this.props.meow.eachLat+','+this.props.meow.eachLon+'&key=AIzaSyDrwNIpdARXo4GAHbztsp7s-Z_jFuh2G2I'

       return (
        <View style={{flex:1, flexDirection:'column', marginTop:58, marginLeft:4}}>
          <Text style={{fontSize: 23}}> My idea  location:</Text>
          <Text> (Created on: {this.props.meow.currentDate} ) {"\n"}</Text>
          <Text>Name of the location: {this.state.serverJSON}</Text>
          <Text>GPS Coordinates: Latitude: {this.props.meow.eachLat}, longitude: {this.props.meow.eachLon}</Text>

          <Text style={{marginTop:10}}>
            {this.state.geocoderAPI}
            sssssssssssssssssssssssssssssssssssssssssssssssss
            {this.state.serverJSON}
          </Text>

        <View style={{alignItems:'center'}}>
          <GoogleStaticMap style={styles.map}
            latitude={this.props.meow.eachLat.toString()}
            longitude={this.props.meow.eachLon.toString()}
            zoom={13}
            size={{ width: 350, height: 350 }}/>
        </View>
      </View>
       );
    }
  }


const styles = StyleSheet.create({
  container:{
      flex: 1,
    },
    map:{
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 1
    }
  })
