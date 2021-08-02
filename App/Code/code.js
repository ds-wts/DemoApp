import React from 'react';

const Code = {
  GalleryMain: `/* 
  * * In this example i used responsive screen library
  * ReferenceLink => https://www.npmjs.com/package/react-native-responsive-screen
  * Installation => npm i react-native-responsive-screen  
 
  * * For Image show in home screen
  * ReferenceLink => https://reactnativeelements.com/docs
  * Installation => npm install react-native-elements react-native-vector-icons react-native-safe-area-context 
 
  * * For Swiper Slider 
  * ReferenceLink => https://www.npmjs.com/package/react-native-swiper
  * Installation => npm i react-native-swiper
  
  * * For Zoom Images
  * ReferenceLink => https://www.npmjs.com/package/@dudigital/react-native-zoomable-view
  * Installations => npm i @dudigital/react-native-zoomable-view
 
 */
 
 import React, {useState, useEffect} from 'react';
 import {
   View,
   StyleSheet,
   Text,
   SafeAreaView,
   Dimensions,
   FlatList,
   TouchableOpacity,
   ActivityIndicator,
 } from 'react-native';
 
 import {Images} from '../../Data/dummy-data';
 import {wp, hp} from '../../Helper/Helper';
 import {Image} from 'react-native-elements';
 
 const GalleryMain = props => {
   const _renderItem = ({item, index}) => {
     return (
       <View style={{flex: 1}}>
         <TouchableOpacity
           onPress={() =>
             props.navigation.navigate('GalleryView', {
               data: {image: Images, id: index},
             })
           }
           style={styles.imageContainer}>
           <Image
             style={{width: wp(40), height: hp(40), padding: 5}}
             source={{uri: item.image}}
             resizeMode="contain"
             PlaceholderContent={<ActivityIndicator size="large" color="blue" />}
           />
         </TouchableOpacity>
       </View>
     );
   };
 
   return (
     <SafeAreaView style={styles.screen}>
       <View
         style={{
           flex: 1,
           backgroundColor: 'white',
         }}>
         <Text
           style={{
             color: 'black',
             fontSize: hp(4),
             fontWeight: 'bold',
             textAlign: 'center',
             marginTop: hp(2),
           }}>
           My Gallery
         </Text>
 
         <FlatList
           data={Images}
           keyExtractor={(item, index) => item.id}
           renderItem={_renderItem}
           numColumns={2}
         />
       </View>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   screen: {
     flex: 1,
   },
   imageContainer: {
     borderWidth: 1,
     marginHorizontal: wp(2),
     marginVertical: hp(2),
     justifyContent: 'center',
     alignItems: 'center',
   },
 });
 
 export default GalleryMain; 
`,
  GalleryView: `import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  Animated,
  Image,
} from 'react-native';

import {hp, wp} from '../../Helper/Helper';
import Swiper from 'react-native-swiper';

import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableViewWithGestures';

const GalleryView = props => {
  const data = props.route.params.data;

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar hidden />
      <Swiper
        loop={false}
        showsPagination={false}
        index={data.id}
        overScrollMode="never">
        {data.image.map((item, index) => {
          return (
            <View style={{flex: 1}} key={index}>
              <ReactNativeZoomableView
                maxZoom={1.5}
                minZoom={0.5}
                zoomStep={0.5}
                bindToBorders={true}
                captureEvent={false}>
                <Image
                  key={index}
                  style={styles.zoomedImage}
                  resizeMode="contain"
                  source={{uri: item.image}}
                />
              </ReactNativeZoomableView>
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  zoomedImage: {
    width: wp(100),
    height: hp(100),
  },
});

export default GalleryView;
`,
  SmsRetriever: `/* 
Installation => npm i react-native-otp-verify
ReferenceLink => https://www.npmjs.com/package/react-native-otp-verify
ReferenceLink => https://medium.com/@ansonmathew/automatic-sms-verification-react-native-android-9cf1af1cde53

* * Should start with <#>, to register as an OTP SMS
* * The message should end with the generated hash key

1. A valid verification message might look like the following:
<#> Your Example app code is: 123456 /f8Escobih1Z

2. /f8Escobih1Z this is hash key 
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';

const SmsRetriever = props => {
  const getHash = () =>
    RNOtpVerify.getHash()
      .then(res => console.log('HashKey =>', res))
      .catch(console.log);

  const startListeningForOtp = () =>
    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(otpHandler))
      .catch(p => console.log(p));

  const otpHandler = message => {
    console.log('Message', message);
    const otp = /(\d{6})/g.exec(message)[1];

    console.log('otp', otp);
    RNOtpVerify.removeListener();
  };

  useEffect(() => {
    getHash();
    startListeningForOtp();

    return () => {
      RNOtpVerify.removeListener();
    };
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Sms Otp Listeners Example</Text>
    </View>
  );
};

export default SmsRetriever;
`,
  TimeLineFlatList: `/*
* ReferenceLink => https://www.npmjs.com/package/react-native-timeline-flatlist
* * Installation => npm i react-native-timeline-flatlist
*/

import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

const TimeLineFlatList = () => {
 const [selected, setSelected] = useState(null);

 const data = [
   {
     time: '09:00',
     title: 'Archery Training',
     description:
       'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
     lineColor: '#009688',
     icon: require('../../../assets/img/archery.png'),
     imageUrl:
       'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg',
   },
   {
     time: '10:45',
     title: 'Play Badminton',
     description:
       'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
     icon: require('../../../assets/img/badminton.png'),
     imageUrl:
       'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg',
   },
   {
     time: '12:00',
     title: 'Lunch',
     icon: require('../../../assets/img/lunch.png'),
   },
   {
     time: '14:00',
     title: 'Watch Soccer',
     description:
       'Team sport played between two teams of eleven players with a spherical ball. ',
     lineColor: '#009688',
     icon: require('../../../assets/img/soccer.png'),
     imageUrl:
       'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg',
   },
   {
     time: '16:30',
     title: 'Go to Fitness center',
     description: 'Look out for the Best Gym & Fitness Centers around me :)',
     icon: require('../../../assets/img/dumbbell.png'),
     imageUrl:
       'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg',
   },
 ];

 const onEventPress = data => {
   console.log('onEventPress', data);
   setSelected(data);
 };

 return (
   <View style={{flex: 1, marginTop: 20}}>
     {selected != null ? (
       <Text style={{marginTop: 10}}>
         Selected event: {selected.title} at {selected.time}
       </Text>
     ) : null}
     <Timeline
       style={{padding: 10}}
       data={data}
       circleSize={20}
       circleColor="rgb(45,156,219)"
       lineColor="rgb(45,156,219)"
       timeContainerStyle={{minWidth: 52}}
       timeStyle={{
         textAlign: 'center',
         backgroundColor: '#ff9797',
         color: 'white',
         padding: 5,
         borderRadius: 13,
       }}
       descriptionStyle={{color: 'gray'}}
       options={{
         style: {paddingTop: 5},
       }}
       columnFormat="two-column"
       detailContainerStyle={{
         marginBottom: 20,
         paddingLeft: 5,
         paddingRight: 5,
         backgroundColor: '#BBDAFF',
         borderRadius: 10,
       }}
       separator={false}
       renderFullLine
       onEventPress={onEventPress}
     />
   </View>
 );
};

export default TimeLineFlatList;
`,
};

export default Code;
