import React from 'react'
import { Text,StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native'
 import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
 import { LinearGradient } from "expo-linear-gradient";

 const FirstPage = ({navigation }) => {
  return (
     
    <SafeAreaView style={{flex:1 }}>
    <Text style={styles.heading}>Welcome</Text>
      
    <LinearGradient colors={['#3E54AC',"#3E54AC"]}style={{height:160,marginLeft:200,borderBottomLeftRadius:170,overflow:'hidden',bottom:65}}/>
   <FontAwesome5 name='door-open' size={30} color={'#3E54AC'} style={{bottom:170,left:15}}/>

   <View style={styles.container1}>
     <FontAwesome5 name='user' size={85} color={'#3E54AC'} style={{top:70}}/>
     <Text style={{top:100,fontSize:20,color:'#3E54AC'}}>Admin Login</Text>
         <TouchableOpacity
           onPress={() => navigation.navigate('Admin')}
      style={styles.button}> 
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    
      <FontAwesome5 name='users' size={85} color={'#3E54AC'} style={{top:70}}/>
     <Text style={{top:100,fontSize:20,color:'#3E54AC'}}>Student Login</Text>
      <TouchableOpacity
       onPress={() => navigation.navigate('Login')}
    style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    </View>
 
      </SafeAreaView>
    
  )
}

 export default FirstPage
 const styles = StyleSheet.create({
  heading:{
    alignSelf:'center',
    fontWeight:'bold',
    marginBottom:20,
    fontSize:30,
   top:50,
    right:70,
    color:'#3E54AC'
  },

container1: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  bottom:80
},
 button: {    
  backgroundColor: '#3E54AC',
  width: '60%',
  padding: 15,
  borderRadius: 6,
  alignItems: 'center',
  bottom:50,
  marginTop:190,
  marginBottom:20

},
buttonText: {
  color: 'white',
  fontWeight: '700',
  fontSize: 16,
},


    });

