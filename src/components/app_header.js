import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import StringConst from '../const/string_const';

const AppHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{StringConst.APP_NAME}</Text>
      <View style={styles.circleBg}>
        <Text style={styles.textBody}>{StringConst.NAME}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#404040',
    height: 50,
    padding: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  circleBg: {
    height: 30,
    width: 30,
    backgroundColor: 'grey',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textHeader: {color: 'white', fontSize: 22, fontWeight: 'bold'},
  textBody: {color: 'white', fontSize: 14, fontWeight: 'normal'},
});

export default AppHeader;
