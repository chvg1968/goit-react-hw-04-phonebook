import PropTypes from 'prop-types';
import { useState } from 'react';

function SearchFilter(props) {
  const [value, setValue] = useState(props.value || '');

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Find contacts"
      value={value}
      onChange={handleChange}
    />
  );
}

SearchFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SearchFilter;
