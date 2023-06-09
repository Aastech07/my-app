import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, FlatList, Button, SafeAreaView, } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import firebase from 'firebase/compat';



const FetchData = () => {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    firebase.firestore().collection("user").doc(firebase.auth().currentUser.uid).get()
      .then(docSnap => {
        setUsers(docSnap.data())
      })
  }, []);

  return (
    <>
      <View style={styles.main}>
        <LinearGradient colors={['#3E54AC', '#3E54AC',]} style={{ height: 200, borderRadius: 70, overflow: 'hidden', bottom: 48 }} />
        <View style={{ bottom: 260, left: 50 }}>
          <Text style={{ top: 100, fontWeight: 'bold', fontSize: 16, color: 'white' }}>{users.email}</Text>
          <Text style={{ top: 120, color: 'white', fontWeight: '500' }}>{users.username}</Text>
          <Text style={{ top: 100, left: 130, color: 'white', fontWeight: '500' }}>{users.rollno}</Text>
          <Text style={{ top: 80, left: 230, color: 'white', fontWeight: '500' }}>{users.branch}</Text>
        </View>
        <DataFetch data={users.email} />
      </View>

    </>
  )
}

const DataFetch = (props) => {
  const Data = props.data
  const [users1, setUsers1] = useState([]);
  const todoRef = firebase.firestore().collection("userData");

  const where = () => {
  //  useEffect(() => {
   (async () => {
      todoRef.where("Email", '==', Data)
        .onSnapshot(
          querySnapshot => {
            const users1 = []
            querySnapshot.forEach((doc) => {
              const { text, Email, d, T } = doc.data()
              users1.push({
                id: doc.id,
                text,
                Email,
                d,
                T
              });
            })
            
         setUsers1(users1)
         
          }
        )
    })();
   //  }, []);
   

  }
  /*useEffect(() => {
    const unsubscribe = firestore().collection('users').doc(userId)
      .onSnapshot((doc) => {
        const data = doc.data();
        if (data) {
          setStatus(data.status);
        }
      });

    return () => unsubscribe();
  }, []);
*/
 





  return (
    <>

      <View style={{ bottom: 125 }}>
        <Button title={'Click'} color='#3E54AC' onPress={() => where()}/>
      </View>

      <SafeAreaView style={{
        bottom: 123,
      }}>

        <FlatList
          style={{ height: 622 }}
          data={users1}
          numColumns={1}
          renderItem={({ item }) => (
            <Pressable style={styles.container}>
              <View style={styles.innerContainer}>
                <Text style={{ fontWeight: 'bold' }}>{item.text}</Text>
                <Text style={{ fontWeight: 'bold', left: 250, color: '#3E54AC' }}>Present</Text>
                <Text style={{ fontWeight: '500', bottom: 10 }}>Date : {item.d}</Text>
                <Text style={{ fontWeight: '500', bottom: 2 }}>Time :{item.T}</Text>

              </View>
            </Pressable>)} />


      </SafeAreaView>


    </>
  )

}


export { FetchData }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },



});
