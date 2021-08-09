/* 
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
            props.navigation.navigate('GalleryView',{image: Images, id: index})
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
