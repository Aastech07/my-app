import Login from './Component/Login';
import HomeScreen from './Component/HomeScreen';
import Account from './Component/Account';
import LogOut from './Component/LogOut';
import FirstPage from './Component/FirstPage';
import Admin from './Component/Admin';
import Account1 from './Component/Account1';
import MyTabs from './Component/MyTabs';
import MyTab1 from './Component/MyTab1';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name='Page' options={{ headerShown: false }} component={FirstPage} />
          <stack.Screen name='Login' options={{ headerShown: false }} component={Login} />
          <stack.Screen name='Account' options={{ headerShown: false }} component={Account} />
          <stack.Screen name='Home' options={{ headerShown: false }} component={HomeScreen} />
          <stack.Screen name='Admin' options={{ headerShown: false }} component={Admin} />
          <stack.Screen name='Account1' options={{ headerShown: false }} component={Account1} />
          <stack.Screen name='LogOut' options={{ headerShown: false }} component={LogOut} />
          <stack.Screen name='MyTabs' options={{ headerShown: false }} component={MyTabs} />
          <stack.Screen name='MyTab1' options={{ headerShown: false }} component={MyTab1} />
          

        </stack.Navigator>
      </NavigationContainer>

    </>

  );
}
