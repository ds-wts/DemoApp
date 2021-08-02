import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Code from '../Code/code';
import HomeItem from '../Components/HomeItem';

const HomeScreen = props => {
  const {navigation} = props;
  const screen = [
    {
      title: 'SMS Retriever',
      fileContent: [
        {
          fileName: 'Sms Retriever',
          code: Code.SmsRetriever,
        },
      ],
    },
    {
      title: 'Time Line Flat List',
      fileContent: [
        {
          fileName: 'Time Line Flat List',
          code: Code.TimeLineFlatList,
        },
      ],
    },
    {
      title: 'Gallery View',
      fileContent: [
        {
          fileName: 'GalleryMain',
          code: Code.GalleryMain,
        },
        {
          fileName: 'Gallery View',
          code: Code.GalleryView,
        },
      ],
    },
  ];

  const onSelectHandler = item => {
    console.log('onSelectHandler', item);
    switch (item) {
      case 'SMS Retriever':
        navigation.navigate('Sms');
        break;
      case 'Time Line Flat List':
        navigation.navigate('TimelineFlatList');
        break;
      case 'Gallery View':
        navigation.navigate('Gallery');
        break;
      default:
        console.log('Not Integrated');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <FlatList
          data={screen}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <HomeItem
                item={item}
                onSelect={() => onSelectHandler(item.title)}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default HomeScreen;
