import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import SmsRetriever from '../Screens/SmsRetriever/SmsRetriver';
import TimeLineFlatList from '../Screens/TimeLineFlatList/TimeLineFlatList';
import GalleryMain from '../Screens/GalleryView/GalleryMain';
import GalleryView from '../Screens/GalleryView/GalleryView';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sms" component={SmsRetriever} />
        <Stack.Screen name="TimelineFlatList" component={TimeLineFlatList} />
        <Stack.Screen name="Gallery" component={GalleryMain} />
        <Stack.Screen
          name="GalleryView"
          component={GalleryView}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
