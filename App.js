

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
import SearchForm from './src/components/searchbox';
import useApi from './src/hooks/useApi';
import useDebounce from './src/hooks/useDebounce';
import useSearchForm from './src/hooks/useSearch';
import ApiConstant from './src/const/api_const';
import StringConst from './src/const/string_const';
import RenderGifItem from './src/components/gif_list_item';
import Loading from './src/components/loading_screen';
import AppHeader from './src/components/app_header';

const App = () => {
  const [page, setPage] = useState(1);
  const {query, handleInputChange, handleSubmit} = useSearchForm();
  const debouncedQuery = useDebounce(query, 500);
  const [firstRun, setFirstRun] = useState(true);
  const isFirstRun = useRef(true);
  const flatlistRef = useRef(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;
  const apiEndpoint = query ? ApiConstant.SEARCH : ApiConstant.TRENDING;

  const apiUrl = () =>
    `${ApiConstant.BASE_URL}/${apiEndpoint}?api_key=${ApiConstant.API_KEY}&limit=20&rating=g&q=${query}`;
  const [{data, loading, error, lastPage}, fetchImages] = useApi();

  useEffect(() => {
    fetchImages(apiUrl(0));
    if (isFirstRun.current) {
      isFirstRun.current = false;
      setFirstRun(false);
    }
  }, [debouncedQuery]);
  const loadMoreGifs = () => {
    setPage(page + 1);
    fetchImages(apiUrl(page * 20), true);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
      <View style={styles.container}>
    
    <AppHeader/>
        <SearchForm
          value={query}
          setValue={handleInputChange}
          onSubmit={handleSubmit}
          placeholder="Search Gifs"
        />

        {loading && <Loading></Loading>}
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
          renderItem={RenderGifItem}
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
    backgroundColor: '#121212',
  },

  textInput: {
    width: '100%',
    height: 50,
    color: 'white',
  },

  scrollTopButton: {
    height: 50,
    width: 50,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
 
});
export default App;
