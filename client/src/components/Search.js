import { useState } from 'react';

const Search = ({ onAdd }) => {
  const [text, setText] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    onAdd({ text });
    setText('');
  };

  return (
    <form onSubmit={onSubmit} className='flex justify-center'>
      <input
        className='rounded-r-none placeholder-gray-600 flex-grow'
        type='text'
        placeholder='Search for a recipe...'
        required
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
      />
      <input
        type='submit'
        value='Search'
        className='bg-blue-700 text-white rounded-l-none cursor-pointer	'
      />
    </form>
  );
};

export default Search;
