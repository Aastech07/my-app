import React from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { auth } from '../firebase'
import { useState, useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase/compat'
import * as Progress from 'react-native-progress';
const Account = ({ navigation }) => {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe
  }, []);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [secure1, setSecure1] = useState('')
  const [rollno, setRollno] = useState('')
  const [branch, setBranch] = useState('')
  const [error, setError] = useState({ field: '', message: '' })
  const [address, setAddress] = useState('')
  const [number, setNumber] = useState('')
  const [dateofbirth, setDateofbirth] = useState('')
  const [Session, setSession] = useState('')

  const registerUser = async (email, password, username, rollno, branch,address,number,dateofbirth,Session) => {

    let loginError = { field: '', message: '' };
    if (email === '', password === '', username === '', rollno === '', branch === '') {
      loginError.field = 'email';
      loginError.message = ' field is required'

      setError(loginError)
    }


    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('Verification email sent')
      }).catch((error) => {
        alert(error.message)
      }).then(() => {
        firebase.firestore().collection('user')
          .doc(firebase.auth().currentUser.uid)
          .set({
            email,
            username,
            rollno,
            branch,
            address,
            number,
            dateofbirth,
            Session

          });
      })
      .catch((error => {
        alert(error.message)
      }))

  }

  const TogglePass = () => {
    setSecure1(!secure1);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, }} behavior='height' >
      <ScrollView style={{ flex: 1, }}>
        <FontAwesome5 name='users' size={45} color={'#3E54AC'} style={{ top: 50, left: 60 }} />

 <LinearGradient colors={['#3E54AC', '#3E54AC',]} style={{ height: 120, marginLeft: 190, borderBottomLeftRadius: 180, overflow: 'hidden', bottom: 48 }} />
 <Progress.CircleSnail color={['#3E54AC']} size={90} spinDuration={5}
          thickness={5} duration={600}
          style={{ bottom: 140, left: 45 }} />

        <View style={{ bottom: 200 }}>
          <Text style={styles.heading}>Create Account</Text>

          <View style={{ top: 130, left: 6 }}>
            <Text style={styles.text}>Email</Text>
            <FontAwesome5 name="envelope" size={25} color="black" style={{ left: 50, top: 25, opacity: 0.3 }} />
            <TextInput style={styles.input}
              placeholder="Enter your email"
              onChangeText={text => setEmail(text)}
              value={email} />
            {error.field === 'email' && (
              <Text style={{ color: 'red', left: 50, bottom: 20 }}>{error.message}</Text>
            )}

            <Text style={styles.text}>Username</Text>
            <FontAwesome5 name="user" size={25} color="black" style={{ left: 50, top: 25, opacity: 0.3 }} />
            <TextInput style={styles.input}
              placeholder="Enter your Username"
              onChangeText={text => setUsername(text)}
              value={username} />
            {error.field === 'email' && (
              <Text style={{ color: 'red', left: 50, bottom: 20 }}>{error.message}</Text>
            )}

            <Text style={styles.text}>Password</Text>
            <FontAwesome5 name="lock" size={25} color="black" style={{ left: 50, top: 25, opacity: 0.3 }} />
            <TextInput style={styles.input}
              placeholder="Enter your Password"
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={secure1 ? false : true} />
            {error.field === 'email' && (
              <Text style={{ color: 'red', left: 50, bottom: 20 }}>{error.message}</Text>

            )}

            <TouchableOpacity onPress={() => TogglePass()}>
              <Text style={{ left: 300, bottom: 60 }}>{secure1 ? <FontAwesome5 name='eye' size={17} color={"black"} /> : <FontAwesome5 name='eye-slash' size={17} color={"black"} />}</Text>
            </TouchableOpacity>

            <View style={{ bottom: 20 }}>
              <Text style={styles.text}>Rollno</Text>
              <FontAwesome5 name="list-ol" size={20} color="black" style={{ left: 50, top: 25, opacity: 0.3 }} />
              <TextInput style={styles.input}
                placeholder="Enter your Rollno"
                onChangeText={text => setRollno(text)}
                value={rollno} />
              {error.field === 'email' && (
                <Text style={{ color: 'red', left: 50, bottom: 20 }}>{error.message}</Text>
              )}

              <Text style={styles.text}>Branch</Text>
              <FontAwesome5 name="book" size={20} color="black" style={{ left: 50, top: 25, opacity: 0.3 }} />
              <TextInput style={styles.input}
                placeholder="Enter your Branch"
                onChangeText={text => setBranch(text)}
                value={branch} />
              {error.field === 'email' && (
                <Text style={{ color: 'red', left: 50, bottom: 20 }}>{error.message}</Text>
              )}
            </View>


            <View style={{ bottom: 20 }}>
              <Text style={styles.text}>Address</Text>
              <FontAwesome5 name="map-pin" size={20} color="black" style={{ left: 50, top: 25, opacity: 0.3 }} />
              <TextInput style={styles.input}
                placeholder="Enter your Address"
                onChangeText={text => setAddress(text)}
                value={address} />
              {error.field === 'email' && (
                <Text style={{ color: 'red', left: 50, bottom: 20 }}>{error.message}</Text>
              )}

              <Text style={styles.text}>Phone Number</Text>
              <FontAwesome5 name="book" size={20} color="black" style={{ left: 50, top: 25, opacity: 0.3 }} />
              <TextInput style={styles.input}
                placeholder="Enter your Branch"
                onChangeText={text => setNumber(text)}
                value={number}
                keyboardType={'phone-pad'}
                 />
              {error.field === 'email' && (
                <Text style={{ color: 'red', left: 50, bottom: 20 }}>{error.message}</Text>
              )}
            </View>
            <View style={{ bottom: 20 }}>
              <Text style={styles.text}>DOB</Text>
              <FontAwesome5 name="map-pin" size={20} color="black" style={{ left: 50, top: 25, opacity: 0.3 }} />
              <TextInput style={styles.input}
                placeholder="Enter your DOB"
                onChangeText={text => setDateofbirth(text)}
                value={dateofbirth} />
              {error.field === 'email' && (
                <Text style={{ color: 'red', left: 50, bottom: 20 }}>{error.message}</Text>
              )}

              <Text style={styles.text}>Session</Text>
              <FontAwesome5 name="book" size={20} color="black" style={{ left: 50, top: 25, opacity: 0.3 }} />
              <TextInput style={styles.input}
                placeholder="Enter Session"
                onChangeText={text => setSession(text)}
                value={Session}
              
                 />
              {error.field === 'email' && (
                <Text style={{ color: 'red', left: 50, bottom: 20 }}>{error.message}</Text>
              )}
            </View>
            <View style={{}}>

            </View>
          </View>
          <View style={{ top: 110, left: 20 }}>
            <TouchableOpacity
              onPress={() => registerUser(email, password, username, rollno, branch,address,number,dateofbirth,Session)}>
              <LinearGradient colors={['#3E54AC', '#3E54AC',]} style={{ top: 30, marginLeft: 150, marginRight: 80, padding: 12, borderRadius: 5, marginTop: 20 }}>
                <Text style={styles.button1}>SIGN UP</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', paddingTop: 180, right: 30 }}>
            <Text style={styles.login}>Already have a Account:</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.login1} >Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
export default Account

const styles = StyleSheet.create({

  heading: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 30,
    top: 120,
    right: 40,
  },

  login: {
    fontWeight: 'bold'
  },
  login1: {
    marginTop: 8,
    fontSize: 16,
    color: '#3E54AC',
    left: 110,
    bottom: 30

  },

  hip: {
    left: 15,
    marginBottom: 22

  },
  input: {

    marginLeft: 50,
    marginRight: 50,
    padding: 15,
    bottom: 20,
    left: 20
  },
  text: {
    left: 50,
    fontWeight: 'bold'
  },

  button1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },




});


