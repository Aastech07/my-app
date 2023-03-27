import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/compat';
import { LinearGradient } from "expo-linear-gradient"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Notification = () => {


  var myDate = new Date();
  var hrs = myDate.getHours();

  var greet;

  if (hrs < 12)
    greet = 'Good Morning';
  else if (hrs >= 12 && hrs <= 17)
    greet = 'Good Afternoon';
  else if (hrs >= 17 && hrs <= 24)
    greet = 'Good Evening';


  const [data, setData] = useState([]);

  useEffect(() => {
    firebase.firestore().collection("user").doc(firebase.auth().currentUser.uid).get()
      .then(docSnap => {
        setData(docSnap.data())
      })
  }, []);
  const user = data.username


  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection("Messages");

  useEffect(() => {
    (async () => {
      todoRef
        .onSnapshot(
          querySnapshot => {
            const users = []
            querySnapshot.forEach((doc) => {
              const { comp, branch, data1, rollno } = doc.data()
              users.push({
                id: doc.id,
                comp,
                branch,
                data1,
                rollno
              });
            })
            setUsers(users)
          }
        )
    })();
  }, []);

  return (
    <>


      <View style={{ flex: 1 }}>
        <LinearGradient colors={['#3E54AC', '#3E54AC',]} style={{ height: 160, bottom: 30, overflow: 'hidden' }} />
        <Text style={{ bottom: 110, left: 30, color: 'white', fontSize: 17, fontWeight: 'bold' }}>{greet}</Text>
        <Text style={{ bottom: 100, left: 30, color: 'white', fontSize: 21, fontWeight: 'bold' }}>{user}</Text>
        <FontAwesome5 name='user' size={45} color={"white"} style={{ left: 280, bottom: 150 }} />

        <FlatList
          style={{ height: '50%', bottom: 100 }}
          data={users}
          numColumns={1}
          renderItem={({ item }) => (
            <Pressable style={styles.container}>
              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>{item.branch}</Text>
                <Text style={styles.itemHeading}>{item.rollno}</Text>
                <Text style={styles.itemHeading}>{item.comp}</Text>
                <Text style={styles.itemHeading}>{item.data1}</Text>

              </View>
            </Pressable>)} />
      </View>

    </>
  )
}

export default Notification
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,


  },
  innerHeight: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  itemHeading: {
    fontWeight: 'bold'
  },
  itemText: {
    fontWeight: 'bold'
  },

});
