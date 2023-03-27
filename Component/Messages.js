import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient"
import firebase from 'firebase/compat'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Messages = () => {

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
  const [comp, setComp] = useState('');
  const [data1, setData1] = useState('');

  useEffect(() => {
    firebase.firestore().collection("user").doc(firebase.auth().currentUser.uid).get()
      .then(docSnap => {
        setUsers(docSnap.data())
      })
  }, []);
  const user = users.username
  const branch = users.branch
  const rollno = users.rollno

  const todoRef = firebase.firestore().collection("Messages");
  const todoref = () => {

    if (comp && comp || data1 && data1 || branch && branch || rollno && rollno.length > 0) {

      const data = {
        comp,
        data1,
        branch,
        rollno
      }
      todoRef
        .add(data)
        .then(() => {
          setComp(''),
            setData1
        }).catch((error) => {
          alert(error)
        });
    }
  }

  return (

    <View style={{}}>
      <LinearGradient colors={['#3E54AC', '#3E54AC',]} style={{
        height: 160,
        bottom: 30, overflow: 'hidden'
      }} />
      <Text style={{ bottom: 110, left: 30, color: 'white', fontSize: 17, fontWeight: 'bold' }}>{greet}</Text>
      <Text style={{ bottom: 100, left: 30, color: 'white', fontSize: 21, fontWeight: 'bold' }}>{user}</Text>
      <FontAwesome5 name='users' size={45} color={"white"} style={{ left: 280, bottom: 150 }} />

      <View style={{ paddingBottom: 50, marginLeft: 6, marginRight: 6, backgroundColor: "#ffffff", borderRadius: 10, }}>
        <Text style={{
          alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: '#3E54AC',
          backgroundColor: '#ffff', padding: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10,
          bottom: 55
        }}>Complain Form</Text>

        <View style={{}}>
          <Text style={{ left: 5, fontSize: 14, fontWeight: 'bold' }}>Complain About:-</Text>
          <TextInput style={{ marginLeft: 115, marginRight: 30, padding: 5, bottom: 25, left: 20, borderWidth: 1 }}
            onChangeText={text => setComp(text)}
            value={comp} />

        </View>
        <View style={{}}>
          <Text style={{ left: 20, fontSize: 14, fontWeight: 'bold' }}>Message:-</Text>
          <TextInput style={{
            marginLeft: 115, marginRight: 30, padding: 5, bottom: 25,
            left: 20, borderWidth: 1, paddingBottom: 20
          }}
            onChangeText={text => setData1(text)}
            textContentType={'fullStreetAddress'}
            value={data1} />
        </View>

        <View style={styles.container1}>
          <TouchableOpacity
            onPress={() => todoref()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>


  )
}
export default Messages
const styles = StyleSheet.create({
  container1: {

  },
  button: {
    backgroundColor: '#3E54AC',
    width: '50%',
    padding: 13,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 40,
    alignSelf: "center"
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})