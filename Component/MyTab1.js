import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QR from './QR';
import Fetch from './Fetch';
import AdminProfile from './AdminProfile';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Notification from './Notification';
import Messages1 from './Messages1';

const Tab = createBottomTabNavigator();
function MyTab1() {
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
                        case 'Home':
                            iconName = 'qrcode';
                            break;
                        case 'Profile':
                            iconName = 'user-circle';
                            break;
                        case 'Fetch':
                            iconName = 'chart-pie';
                            break;
                        case 'Notification':
                            iconName = 'bell';
                            break;
                        case 'Messages1':
                            iconName = 'comments';
                            break;
                   
                    }

                    return <Icon name={iconName} color={color} size={24} />;
                },

                tabBarStyle: {
                    position: 'absolute',
                    bottom: 10,
                    left: 20,
                    right: 20,
                    elevation: 10,
                    backgroundColor: '#ffffff',
                    height: 55,
                    borderRadius: 6
                },


            })}>
                
            <Tab.Screen name="Home" component={QR} options={{ headerShown: false }} />
            <Tab.Screen name="Fetch" component={Fetch} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={AdminProfile} options={{ headerShown: false }} />
            <Tab.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
            <Tab.Screen name="Messages1" component={Messages1} options={{ headerShown: false }} />
           
        </Tab.Navigator>

    )
}

export default MyTab1