import React from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Button, Alert, } from 'react-native'
import { auth } from '../firebase'
import { useState, useEffect } from 'react'
import firebase from 'firebase/compat';
import { LinearGradient } from "expo-linear-gradient"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import * as Progress from 'react-native-progress';
const Login = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secure, setSecure] = useState('')


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(users => {
      if (users) {
        navigation.navigate("MyTabs");
      }
    });

    return unsubscribe
  }, []);

  const forgetPassword = () => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('password reset email sent')
      }).catch((error) => {
        alert(error)
      })
  }

  const handleLogin = () => {

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  };
  const togglePass = () => {
    setSecure(!secure);
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1, }} behavior='height' >
      <ScrollView style={{ flex: 1 }}>
        <FontAwesome5 name='users' size={45} color={"#3E54AC"} style={{ top: 50, left: 60 }} />
        <LinearGradient colors={['#3E54AC', '#3E54AC',]} style={{
          height: 120, marginLeft: 190,
          borderBottomLeftRadius: 180, overflow: 'hidden', bottom: 48
        }} />

        <Progress.CircleSnail color={['#3E54AC']} size={90} spinDuration={5}
          thickness={5} duration={600}
          style={{ bottom: 140, left: 45 }} />

        <View style={{ bottom: 50 }}>
          <View style={{ bottom: 130 }}>
            <Text style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              marginBottom: 20,
              fontSize: 30,
              top: 120,
              right: 65,

            }}>Welcome </Text>


            <View style={{ top: 130, left: 5 }}>
              <Text style={styles.text}>Email</Text>
              <FontAwesome5 name="envelope" size={25} color="black" style={{ left: 50, top: 25, opacity: 0.3 }} />
              <TextInput style={styles.input}
                placeholder="Enter your email"
                onChangeText={text => setEmail(text)}
                value={email} />

              <Text style={styles.text}>Password</Text>
              <FontAwesome5 name="lock" size={25} color="black" style={{ left: 50, top: 25, opacity: 0.3 }} />
              <TextInput style={styles.input}
                placeholder="Enter your Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={secure ? false : true} />


              <TouchableOpacity onPress={() => togglePass()}>
                <Text style={{ left: 310, bottom: 60 }}>{secure ? <FontAwesome5 name='eye' size={17} color={"black"} /> : <FontAwesome5 name='eye-slash' size={17} color={"black"} />}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => forgetPassword()}>
              <Text style={{ left: 250, top: 140, color: '#3E54AC', fontWeight: '500' }}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={{ top: 160, left: 20 }}>
              <TouchableOpacity
                onPress={() => handleLogin()}>
                <LinearGradient colors={['#3E54AC', '#3E54AC',]} style={{ top: 10, marginLeft: 150, marginRight: 80, padding: 12, borderRadius: 5, marginTop: 20 }}>
                  <Text style={styles.button1}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', paddingTop: 200, right: 30 }}>
              <Text style={styles.login}>Don't have a Account:</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Account')}>
                <Text style={styles.login1} >sign up</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  )
}

export default Login
const styles = StyleSheet.create({

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
    padding: 20,
    bottom: 20,
    left: 20,

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

