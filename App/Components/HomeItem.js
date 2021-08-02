import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon, Overlay} from 'react-native-elements';
import {iconType} from '../Helper/Helper';
import OverlayItem from './OverlayItem';

const HomeItem = props => {
  const {onSelect, item} = props;

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <TouchableOpacity onPress={onSelect}>
      <View
        style={{
          backgroundColor: 'white',
          height: 50,
          width: '95%',
          marginHorizontal: 10,
          marginVertical: 10,
          borderRadius: 10,
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 10,
          paddingHorizontal: 10,
          borderColor: 'cyan',
          elevation: 3,
        }}>
        <Text style={{fontSize: 18}}>{item.title}</Text>
        <TouchableOpacity onPress={toggleOverlay}>
          <Icon
            name="download"
            type={iconType.antdesign}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <OverlayItem
        visible={visible}
        toggleOverlay={toggleOverlay}
        fileName={item.fileContent}
      />
    </TouchableOpacity>
  );
};

export default HomeItem;
