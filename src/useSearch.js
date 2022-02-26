import {useState} from 'react';

const useSearchForm = () => {
  const [query, setInputs] = useState('');

  const handleSubmit = e => {
    console.log('handleSubmit');
    if (e) {
      e.preventDefault();
    }
  };
  const handleInputChange = e => {
    console.log('handleInputChange');
    e.persist();
    setInputs(e.target.value);
  };

  return {
    handleSubmit,
    handleInputChange,
    query,
  };
};

export default useSearchForm;
