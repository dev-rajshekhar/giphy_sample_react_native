import React from 'react';
import {TextInput} from 'react-native';

const SearchForm = ({onSubmit, placeholder, setValue, value}) => {
  return (
    <TextInput
      style={{
        width: `100%`,
        height: 50,
        color: 'black',
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 2,
      }}
      placeholder={placeholder}
      onChangeText={setValue}
      value={value}
      autoFocus={true}
      onSubmit={onSubmit}
    />
  );
};
export default SearchForm;
