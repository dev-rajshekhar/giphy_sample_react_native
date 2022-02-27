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
  StatusBar,
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

const App = () => {
  const [term, updateTerm] = useState('');
  const [page, setPage] = useState(1);

  const API_KEY = 'zgc9jybhOj86SU914CSSn6wHacdDpJNJ';
  const apiEndpoint = term ? 'search' : 'trending';
  const debouncedQuery = useDebounce(term, 500);

  const {query, handleInputChange, handleSubmit} = useSearchForm();
  const [firstRun, setFirstRun] = useState(true);
  const isFirstRun = useRef(true);
  const flatlistRef = useRef(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;
  const apiUrl = offset =>
    `https://api.giphy.com/v1/gifs/${apiEndpoint}?api_key=${API_KEY}&limit=20&rating=g&q=${term}`;
  
    const [{data, loading, error, lastPage}, fetchImages] = useApi();
  const ITEM_WIDTH = Dimensions.get('window').width;
  const onSearch = () => {
    console.log('onSearch');
  };

  useEffect(() => {
    fetchImages(apiUrl(0));
    // onSearch(query);

    if (isFirstRun.current) {
      isFirstRun.current = false;
      setFirstRun(false);
    }
  }, [debouncedQuery]);

  const renderItem = ({item}) => {
    const url = item.images.fixed_height.url;
    return (
      <View style={styles.itemContainer}>
        <Image resizeMode="contain" style={styles.image} source={{uri: url}} />
      </View>
    );
  };
  const loadMoreGifs = () => {
    setPage(page + 1);
    fetchImages(apiUrl(page * 20), true);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* <SearchForm
          value={term}
          setValue={handleInputChange}
          onSubmit={handleSubmit}
          placeholder="Search Gifs"
        /> */}
        {/* <TextInput
          placeholder="Search Giphy"
          placeholderTextColor="#fff"
          style={styles.textInput}
          onChangeText={text => onEdit(text)}
        /> */}

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
        <TouchableOpacity  onPress={() => {
          flatlistRef.current.scrollToOffset({ offset: 0, animated: true });
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
    padding: 5,
  },

  textInput: {
    width: '100%',
    height: 50,
    color: 'white',
  },
  image: {
    height: 150,
    width: 150,
  },
  scrollTopButton: {
    height: 50,
    width: 50,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    margin: 5,
  },
});

export default App;
