import React from 'react';
import {StyleSheet, Image, View, Dimensions} from 'react-native';
const ITEM_WIDTH = Dimensions.get('window').width / 2-10;

const RenderGifItem = ({item}) => {
  const url = item.images.fixed_height.url;
  return (
    <View style={styles.itemContainer}>
      <Image resizeMode="cover" style={styles.image} source={{uri: url}} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: ITEM_WIDTH,
    borderRadius: 10,
  },
  itemContainer: {
    height: 150,
    borderRadius: 10,
    flex: 1,
    backgroundColor:'#404040',
    margin :5,
   
  },
});

export default RenderGifItem;
