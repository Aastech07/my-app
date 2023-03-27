import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { LinearGradient } from "expo-linear-gradient"
import { useState, useEffect } from 'react'
import firebase from 'firebase/compat'

const Component = ({ navigation }) => {


  var myDate = new Date();
  var hrs = myDate.getHours();

  var greet;

  if (hrs < 12)
    greet = 'Good Morning';
  else if (hrs >= 12 && hrs <= 17)
    greet = 'Good Afternoon';
  else if (hrs >= 17 && hrs <= 24)
    greet = 'Good Evening';



  const [users, setUsers] = useState([]);
  useEffect(() => {
    firebase.firestore().collection("user").doc(firebase.auth().currentUser.uid).get()
      .then(docSnap => {
        setUsers(docSnap.data())
      })
  }, []);
  const user = users.username


  return (
 <>
    <View style={{}}>
      <LinearGradient colors={['#3E54AC', '#3E54AC',]} style={{
        height: 160,
        bottom: 30, overflow: 'hidden'
      }} />
      <Text style={{ bottom: 110, left: 30, color: 'white', fontSize: 17, fontWeight: 'bold' }}>{greet}</Text>
      <Text style={{ bottom: 100, left: 30, color: 'white', fontSize: 21, fontWeight: 'bold' }}>{user}</Text>
      <FontAwesome5 name='users' size={45} color={"white"} style={{ left: 280, bottom: 150 }} />
      <View style={{}}>
        <View style={{ paddingBottom: 110, backgroundColor: '#ffff', borderRadius: 10, marginLeft: 10, marginRight: 10, top:40 }}>

          <View style={{ left: 100, bottom: 300 }}>
            <View style={{ left: 180, }}>
              <Text style={{ top: 370, fontSize: 16, color: 'black', right: 40 }}>Scanne QrCode</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('QrCode')}>
                <FontAwesome5 name='qrcode' size={40} color={'#3E54AC'} style={{ top: 300 }} />
              </TouchableOpacity>
            </View>


            <View style={{ right: 50, bottom: 10, }}>
              <Text style={{ top: 400, fontSize: 16, color: 'black', right: 10 }}>Calender</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Calender')}>
    <FontAwesome5 name='calendar' size={40} color={'#3E54AC'} style={{ top: 320, }} />
              </TouchableOpacity>
            </View>


            <View style={{ left: 160 }}>
              <Text style={{ top: 400, fontSize: 16, color: 'black', right: 10 }}>Show Report</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('FetchData')}>
                <FontAwesome5 name='chart-pie' size={40} color={'#3E54AC'} style={{ top: 320, left: 10 }} />
              </TouchableOpacity>
            </View>

            <View style={{ top: 60, right: 15 }}>
              <Text style={{ top: 360, fontSize: 16, color: 'black', right: 40 }}>profile</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}>
                <FontAwesome5 name='user-circle' size={40} color={'#3E54AC'} style={{ top: 280, right: 40 }} />
              </TouchableOpacity>
            </View>


          </View>
        </View>
      </View>
    </View>

  
  </>
  )
}
export default Component
const styles = StyleSheet.create({

  button: {
    backgroundColor: '#3E54AC',
    width: '30%',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',

    marginTop: 200,
    marginBottom: 20

  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

});