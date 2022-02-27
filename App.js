/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SearchForm from './src/components/searchbox';
import useApi from './src/useApi';
import useDebounce from './src/useDebounce';
import useSearchForm from './src/useSearch';

const ITEM_WIDTH = Dimensions.get('window').width / 2 - 10;

const App = () => {
  // const [term, updateTerm] = useState('');
  const [page, setPage] = useState(1);
  const API_KEY = 'zgc9jybhOj86SU914CSSn6wHacdDpJNJ';
  const {query, handleInputChange, handleSubmit} = useSearchForm();
  const debouncedQuery = useDebounce(query, 500);
  const [firstRun, setFirstRun] = useState(true);
  const isFirstRun = useRef(true);
  const flatlistRef = useRef(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;
  const apiEndpoint = query ? 'search' : 'trending';

  const apiUrl = offset =>
    `https://api.giphy.com/v1/gifs/${apiEndpoint}?api_key=${API_KEY}&limit=20&rating=g&q=${query}`;
  const [{data, loading, error, lastPage}, fetchImages] = useApi();
  const onSearch = () => {
  };

  useEffect(() => {
    fetchImages(apiUrl(0));
    onSearch(query);

    if (isFirstRun.current) {
      isFirstRun.current = false;
      setFirstRun(false);
    }
  }, [debouncedQuery]);

  const renderItem = ({item}) => {
    const url = item.images.fixed_height.url;
    return (
      <View style={styles.itemContainer}>
        <Image resizeMode="cover" style={styles.image} source={{uri: url}} />
      </View>
    );
  };
  const loadMoreGifs = () => {
    setPage(page + 1);
    fetchImages(apiUrl(page * 20), true);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#151618'}}>
      <View style={styles.container}>

        <View style= {{ backgroundColor:'blacl', height:50,padding:5, width:"100%", flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{color:'white', fontSize:22, fontWeight:'bold'}}>Giphy </Text>
          <View style={{height:40, width:40, backgroundColor:'grey', borderRadius:40, justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:'white', fontSize:14, fontWeight:'bold'}}>RY</Text>
          </View>

        </View>
        <SearchForm
          value={query}
          setValue={handleInputChange}
          onSubmit={handleSubmit}
          placeholder="Search Gifs"
        />
        <FlatList
          ref={flatlistRef}
          keyExtractor={(item, index) => index}
          onEndReached={loadMoreGifs}
          onEndReachedThreshold={0.1}
          keyboardShouldPersistTaps={'handled'}
          numColumns={2}
          data={data}
          onScroll={event => {
            setContentVerticalOffset(event.nativeEvent.contentOffset.y);
          }}
          renderItem={renderItem}
        />
        {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
          <TouchableOpacity
            onPress={() => {
              flatlistRef.current.scrollToOffset({offset: 0, animated: true});
            }}>
            <Image
              source={require('./assets/go_up.png')}
              style={styles.scrollTopButton}
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#151618',
  },

  textInput: {
    width: '100%',
    height: 50,
    color: 'white',
  },
  image: {
    height: 150,
    width: ITEM_WIDTH,
    borderRadius: 10,
  },
  scrollTopButton: {
    height: 50,
    width: 50,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    margin: 5,
    backgroundCard: '#25282c',
    padding: 20,
    borderRadius: 10,
  },
});
export default App;
