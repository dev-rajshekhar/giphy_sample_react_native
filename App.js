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
  // const debouncedQuery = useDebounce(term, 500);

  const {query, handleInputChange, handleSubmit} = useSearchForm();
  const [firstRun, setFirstRun] = useState(true);
  const isFirstRun = useRef(true);

  const apiUrl = offset =>
    `https://api.giphy.com/v1/gifs/${apiEndpoint}?api_key=${API_KEY}&limit=20&rating=g&q=${term}`;

  const [{data, loading, error, lastPage}, fetchImages] = useApi();

  const ITEM_WIDTH = Dimensions.get('window').width;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // const fetchGifs = async () => {
  //   try {
  //     const BASE_URL = 'https://api.giphy.com/v1/gifs/trending';
  //     const searchURL = `${BASE_URL}?limit=20&api_key=${API_KEY}`;
  //     console.log(searchURL);
  //     const resJson = await fetch(searchURL);
  //     const res = await resJson.json();
  //     console.log('RESPONSE =' + res);

  //     setGifs(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // function onEdit(newTerm) {
  //   updateTerm(newTerm);
  //   fetchGifs();
  // }
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
          keyExtractor={(item, index) => index}
          onEndReached={loadMoreGifs}
          onEndReachedThreshold={0.1}
          keyboardShouldPersistTaps={'handled'}
          numColumns={2}
          data={data}
          renderItem={renderItem}
        />
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
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    margin: 5,
  },
});

export default App;
