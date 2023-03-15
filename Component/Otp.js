import React, { useRef, useState } from 'react'
import { Alert, TextInput, TouchableOpacity, View,Text,StyleSheet } from 'react-native'
import { firebaseConfig } from '../firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
//import firebase from 'firebase';
import firebase from 'firebase/compat';
//import { auth } from '../firebase';
const Otp =()=>{

const [phoneNumber,setPhoneNumber] = useState('');
const [code,setCode] = useState('');
const [verificationId,setVerificationId] = useState(null);
const recaptchaVerifier = useRef(null);



const sendVerification = ()=>{

     
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
        .verifyPhoneNumber(phoneNumber,recaptchaVerifier.current)
        .then(setVerificationId);
        setPhoneNumber('');
    
};


const ConfirmCode = ()=>{
     const credential = firebase.auth.PhoneAuthProvider.credential(verificationId,code);
     firebase.auth().signInWithCredential(credential)
     .then(()=>{
        setCode('');
     })
     .catch((Error)=>{
        alert(Error);
     });
     Alert .alert("Login successful.Welcome TO Dashboard");
}
    return(
        <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        />
        <Text style={styles.otpText}>
            Login using OTP
        </Text>
        <TextInput
           placeholder='Phone Number With Country code'
           onChangeText={setPhoneNumber}
           keyboardType='phone-pad'
           autoCompleteType='tel'
           style={styles.TextInput}
        />
        <TouchableOpacity
        style={styles.sendVerification} onPress={sendVerification}>
            <Text style={styles.buttonzText}>
                send Verification
            </Text>
        </TouchableOpacity>

        <TextInput
           placeholder='Confirm Code'
           onChangeText={setCode}
           keyboardType='number-pad'
           style={styles.TextInput}
        />

<TouchableOpacity
        style={styles.sendCode} onPress={ConfirmCode}>
                 <Text style={styles.buttonText}>
            Confirm Verification
            </Text>
        </TouchableOpacity>
        </View>
    )
}
export default Otp

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        backgroundColor:'#0000',
        alignItems:'center',
        justifyContent:'center'
    },

    TextInput:{
    paddingTop:40,
    paddingBottom:20,
    paddingHorizontal:20,
    fontSize:24,
    borderBottomColor:'black',
    borderBottomWidth:20,
    marginBottom:20,
    textAlign:'center',
    color:'black'
    },
    sendVerification:{
        padding:20,
        backgroundColor:'#3498db',
        borderColor:10,
    },
   sendCode:{
       padding:20,
       backgroundColor:'#9b59b6',
       borderRadius:10,
   },
   buttonText:{
    textAlign:'center',
    color:'blue',
    fontWeight:'bold',
   },
   otpText:{
    fontSize:24,
    fontWeight:'bold',
    color:'blue',
    margin:20
   }
});