import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const SearchForm = ({onSubmit, placeholder, setValue, value}) => {
  return (
    <TextInput
      style={styles.input}  
      placeholder={placeholder}
      onChangeText={setValue}
      value={value}
      autoFocus={false}
      onSubmit={onSubmit}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "grey",
    height:48,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor:'white',
    color :'black',
    width :"100%",
    marginTop:15,
    marginBottom:15,

    padding: 10,
  },
});
export default SearchForm;
