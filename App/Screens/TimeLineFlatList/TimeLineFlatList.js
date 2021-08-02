/*
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
