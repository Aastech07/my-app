import React, { useEffect,useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TurboModuleRegistry, View } from 'react-native';
import firebase from 'firebase/compat';
 
const MyData = () => {
  const [users,setUsers]=useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState('absent'); // state to store attendance status
  const [date,setDate]=useState('');
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


  const todoRef = firebase.firestore().collection("userData");
  
  useEffect(()=>{
     (async ()=>{
      todoRef
       .onSnapshot(
              querySnapshot =>{ 
               const users = []
               querySnapshot.forEach((doc)=>{
                                   const { d} = doc.data()
                        users.push({
                          id:doc.id, 
                          
                           d,
                                
                    });
               })
            setUsers(users)    
        }
      )
   })();
   
 
    },[]);
    
    const dates = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate = dates + '-' + month + '-' + year


    const Fetch = firebase.firestore().collection("userData1");
    const todoref = () => {
      if ( Email && Email ||
        user && user || branch && branch || rollno && rollno || attendanceStatus && attendanceStatus
        || currentDate && currentDate > 0) {
  
        const data = {
          
          Email,
          user,
          branch,
          rollno,
          currentDate,
        
          attendanceStatus
        }
        Fetch
          .add(data)
          .then(() => {
       
          }).catch((error) => {
            alert(error)
          })
  
      }
    }
    useEffect(() => {
      setTimeout(() => {
        
        console.warn(currentDate)
        if (date === currentDate) {
          todoref(false)

          }else{
            todoref(true)
          }
             
        
      }, 1000);
    }, []);
  


  return (
       <View style={{flex:1,marginTop:30}}>
  <FlatList
  style={{height:'100%'}}
   data={users}
   numColumns={1}
   renderItem={({item})=>(
      <Pressable style={ styles.container}>
          <View style={styles.innerContainer}>
         
            <Text style={styles.itemText}>{ setDate(item.d)}</Text>
         
          </View>
      </Pressable>)}/>
  </View>
  )
}

 export default MyData
const styles=StyleSheet.create({
   container:{
       backgroundColor:'#e5e5e5',
       padding:15,
       borderRadius:15,
       margin:5,
      marginHorizontal:10,
     
      
   },
  innerHeight:{
     alignItems:'center',
     flexDirection:'column'
  },
  itemHeading:{
    fontWeight:'bold'
  },
  itemText:{
    fontWeight:'bold'
  },

});


