import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Overlay, Icon} from 'react-native-elements';
import {iconType} from '../Helper/Helper';
var RNFS = require('react-native-fs');
import PushNotification from 'react-native-push-notification';
import {FlatList} from 'react-native-gesture-handler';

const OverlayItem = props => {
  const {visible, toggleOverlay, fileName} = props;

  PushNotification.createChannel(
    {
      channelId: 'DemoApp', // (required)
      channelName: 'DemoApp', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    // created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  const downloadFileHandler = (filename, content) => {
    var folder = RNFS.DownloadDirectoryPath + '/Code';
    RNFS.mkdir(folder);
    var path = RNFS.DownloadDirectoryPath + '/Code' + `/${filename}.js`;

    // write the file
    RNFS.writeFile(path, content, 'utf8')
      .then(res => {
        console.log('FILE WRITTEN!');
        PushNotification.localNotification({
          id: '1',
          channelId: 'DemoApp',
          ticker: 'Download success!',
          autoCancel: true,
          vibrate: true,
          vibration: 300,
          ongoing: false,
          priority: 'high',
          visibility: 'private',
          importance: 'high',
          title: filename,
          message: 'Your file has now been saved!',
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const _renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 5,
        }}>
        <Text>{item.fileName}</Text>

        <TouchableOpacity
          onPress={() => {
            downloadFileHandler(item.fileName, item.code);
          }}>
          <Icon name="file-download" type={iconType.fontAwesome5} size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <View style={{height: 150, width: 250}}>
        <View style={{height: '75%'}}>
          <FlatList
            data={fileName}
            keyExtractor={(item, index) => index}
            renderItem={_renderItem}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            fileName.map((item, index) =>
              downloadFileHandler(item.fileName, item.code),
            );
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderWidth: 1,
            padding: 10,
          }}>
          <Text style={{fontSize: 12}}>Download All</Text>
        </TouchableOpacity>
        <Text style={{marginTop: '3%', color: 'grey'}}>
          File Count : {fileName.length}
        </Text>
      </View>
    </Overlay>
  );
};

export default OverlayItem;
