import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Platform, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { LinearGradient } from "expo-linear-gradient";
import firebase from 'firebase/compat';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Speech from 'expo-speech';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


























Notifications.setNotificationHandler({

  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,

  }),
});



const QrCode = () => {


  /*const [mydata , setMyData ]= useState('')
  
  useEffect(()=>{
    setMyData(Email)
    console.warn(mydata)
 },[])*/


  //Notification Codes
  useEffect(() => {
    registerForPushNotificationsAsync()

  }, []);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got notification! 📬",
        body: Email + "  " + rollno + "  " + branch + " " + user + "  " + "Date:-" + d + "  " + "Time:-" + T + "  " + "successful attendance",
        subtitle: "welcome",
        color: 'blue',
        vibrate: true

      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],

      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  const Notification = async () => {
    await schedulePushNotification();
  }

  //QrCode Codes//

  const [subject, setSubject] = useState("");
  const [users1, setUsers1] = useState([]);


  useEffect(() => {
    firebase.firestore().collection("user").doc(firebase.auth().currentUser.uid).get()
      .then(docSnap => {
        setUsers1(docSnap.data())
      })
  }, []);

  const Email = users1.email
  const user = users1.username
  const branch = users1.branch
  const rollno = users1.rollno


  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const hours = new Date().getHours();
  const min = new Date().getMinutes();
  const sec = new Date().getSeconds();


  /* useEffect(() => {
      
      if ( mydata && mydata || attendanceStatus1 && attendanceStatus1
       || d && d .length > 0) {
 
       const data1 = {
       
         mydata,
         d,
         attendanceStatus1
       }
       Fetch
         .add(data1)
         .then(() => {
           
 
         }).catch((error) => {
           alert(error)
         })
       }
 }, []);*/



  const d = date + '-' + month + '-' + year
  const T = hours + ':' + min + ':' + sec



  const Fetch = firebase.firestore().collection("userData");
  const todoref = () => {
    if (text && text || Email && Email ||
      user && user || branch && branch || rollno && rollno || attendanceStatus && attendanceStatus
      || d && d || T && T || subject && subject.length > 0) {

      const data = {
        text,
        Email,
        user,
        branch,
        rollno,
        d,
        T,
        subject,
        attendanceStatus
      }
      Fetch
        .add(data)
        .then(() => {
          setText('')
          setSubject('')

        }).catch((error) => {
          alert(error)
        })

    }

  }


  const navigation = useNavigation()
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [attendanceStatus, setAttendanceStatus] = useState('present'); // state to store attendance status


  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  useEffect(() => {
    askForCameraPermission();
  }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data);
    todoref(true)

  }










  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  const speak = () => {
    const thingToSay = 'successfull';
    Speech.speak(thingToSay);
  };




  // Return the View
  return (
    <>

      <View style={styles.container}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 800, width: 500 }} />
        </View>
        <View style={{ bottom: 150 }}>
          <Text style={styles.maintext}>{text}</Text>

          {scanned && <Button title={'Click'} onPress={() => setScanned(false) + Notification() + speak()} color='#3E54AC' />}
        </View>

        <View style={{ bottom: 60, right: 100 }}>
          <TouchableOpacity
            onPress={() => handleSignOut()}>
            <LinearGradient colors={['#3E54AC', '#3E54AC']} style={{ top: 50, marginLeft: 130, marginRight: 80, padding: 15, borderRadius: 6, marginTop: 20 }}>
              <Text style={styles.button1}>LogOut</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <FontAwesome5 name="book" size={20} color="black" style={{ right: 80, opacity: 0.3, bottom: 175 }} />
        <TextInput style={{
          marginLeft: 50,
          marginRight: 50,
          padding: 20,
          bottom: 220

        }}
          placeholder="Enter subject Name"
          onChangeText={text => setSubject(text)}
          value={subject}
        />

      </View>

    </>
  );
}
export default QrCode
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
    width: 700,
    overflow: 'hidden',
    borderRadius: 30,
    // backgroundColor: 'tomato',
    bottom: 180
  },
  container2: {
    bottom: 100
  },

  text: {
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  container1: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    right: 130,
    bottom: 30
  },
  button1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    paddingLeft: 30,
    paddingRight: 30,
  },
  input: {

    marginLeft: 50,
    marginRight: 50,
    padding: 15,
    bottom: 20,
    left: 20
  },



}); 
