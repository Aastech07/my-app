import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Messages from './Messages';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Notification1 from './Notification1';
import QrCode from './QrCode';
import { FetchData } from './Fetch1';
import MyData from './MyData';
import Data1 from './Profile';
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        style: {
          borderRadius: 15,
          height: 90,
        },
        tabBarIcon: ({ color }) => {
          let iconName;

          switch (route.name) {
            case 'QrCode':
              iconName = 'qrcode';
              break;
            case 'Messages':
              iconName = 'comments';
              break;
            case 'Notification':
              iconName = 'bell';
              break;

            case 'FetchData':
            iconName = 'chart-pie';
            break;

              case 'MyData':
           iconName = 'calendar';
               break;

               case 'Data1':
           iconName = 'user-circle';
               break;  
          }
          return <Icon name={iconName} color={color} size={24} />;
        },

        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 10,
          backgroundColor: '#ffffff',
          height: 55,
          borderRadius: 6,
        },

      })}>
      <Tab.Screen name="QrCode" component={QrCode} options={{ headerShown: false }} />
      <Tab.Screen name="FetchData" component={FetchData} options={{ headerShown: false }} />
      <Tab.Screen name="MyData" component={MyData} options={{ headerShown: false }} />
      <Tab.Screen name="Data1" component={Data1} options={{ headerShown: false }} />
      <Tab.Screen name="Messages" component={Messages} options={{ headerShown: false }} />
      <Tab.Screen name="Notification" component={Notification1} options={{ headerShown: false }} />

    </Tab.Navigator>

  )
}

export default MyTabs