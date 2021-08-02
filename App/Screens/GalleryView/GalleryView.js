import React, {useState, useEffect} from 'react';
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
