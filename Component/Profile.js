import React from 'react'
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import firebase from 'firebase/compat';
import { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';


const Data1 = () => {

  const navigation = useNavigation()
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  };

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
  const Email = users.email
  const user = users.username
  const branch = users.branch
  const rollno = users.rollno
  const Address = users.address
  const Number = users.number
  const DOB = users.dateofbirth
  const Session = users.Session


  return (
    <SafeAreaView style={{}}>
      <LinearGradient colors={['#3E54AC', '#3E54AC',]} style={{
        height: 160,
        bottom: 30, overflow: 'hidden'
      }} />
      <Text style={{ bottom: 110, left: 30, color: 'white', fontSize: 17, fontWeight: 'bold' }}>{greet}</Text>
      <Text style={{ bottom: 100, left: 30, color: 'white', fontSize: 21, fontWeight: 'bold' }}>{user}</Text>
      <FontAwesome5 name='users' size={45} color={"white"} style={{ left: 280, bottom: 150 }} />

      <View style={{}}>
        <FontAwesome5 name='users' size={60} color={"#3E54AC"} style={{
          alignSelf: 'center', padding: 20, bottom: 120,

        }} />
        <Progress.CircleSnail color={['#3E54AC']} size={115} spinDuration={10}
          duration={500} thickness={5}
          style={{ bottom: 230, alignSelf: 'center', }}
        />
        <View style={{
          paddingBottom: 200, backgroundColor: '#ffff', borderRadius: 10, bottom: 210,
          marginLeft: 10, marginRight: 10
        }}>

          <View style={{}}>
            <Text style={{ alignSelf: 'center', top: 10, fontWeight: 'bold', fontSize: 20 }}>{user}</Text>
          </View>

          <View style={{ bottom: 45 }}>
            <Text style={{ top: 67, fontWeight: '500', fontSize: 19, left: 20, color: '#3E54AC' }}>Email:-</Text>
            <Text style={{ left: 80, top: 42, fontWeight: '400', fontSize: 16 }}>{Email}</Text>
          </View>


          <View style={{ bottom: 55 }}>
            <Text style={{ top: 67, fontWeight: '500', fontSize: 17, left: 20, color: '#3E54AC' }}>Branch:-</Text>
            <Text style={{ left: 150, top: 40, fontWeight: '400', fontSize: 17 }}>{branch}</Text>
          </View>

          <View style={{ bottom: 60 }}>
            <Text style={{ top: 67, fontWeight: '500', fontSize: 17, left: 20, color: '#3E54AC' }}>RollNo:-</Text>
            <Text style={{ left: 150, top: 40, fontWeight: '400', fontSize: 17 }}>{rollno}</Text>
          </View>

          <View style={{ bottom: 60 }}>
            <Text style={{ top: 67, fontWeight: '500', fontSize: 17, left: 20, color: '#3E54AC' }}>Address:-</Text>
            <Text style={{ left: 150, top: 40, fontWeight: '400', fontSize: 17 }}>{Address}</Text>
          </View>

          <View style={{ bottom: 60 }}>
            <Text style={{ top: 67, fontWeight: '500', fontSize: 17, left: 20, color: '#3E54AC' }}>PhoneNumber:-</Text>
            <Text style={{ left: 150, top: 42, fontWeight: '400', fontSize: 17 }}>{Number}</Text>
          </View>

          <View style={{ bottom: 60 }}>
            <Text style={{ top: 67, fontWeight: '500', fontSize: 17, left: 20, color: '#3E54AC' }}>DOB:-</Text>
            <Text style={{ left: 150, top: 40, fontWeight: '400', fontSize: 17 }}>{DOB}</Text>
          </View>

          <View style={{ bottom: 60 }}>
            <Text style={{ top: 67, fontWeight: '500', fontSize: 17, left: 20, color: '#3E54AC' }}>Session:-</Text>
            <Text style={{ left: 150, top: 40, fontWeight: '400', fontSize: 17 }}>{Session}</Text>
          </View>
          <View style={{ top: 60, left: 210 }}>


            <View style={{ right: 150, bottom: 70 }}>

              <TouchableOpacity
                onPress={handleSignOut}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Log out</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </View>



    </SafeAreaView>
  )
}

export default Data1

const styles = StyleSheet.create({

  button: {
    backgroundColor: '#3E54AC',
    width: '50%',
    padding: 13,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})