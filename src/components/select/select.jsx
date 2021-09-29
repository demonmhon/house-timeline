import React from 'react';
import PropTypes from 'prop-types';

import './select.scss';

const Select = (props) => {
  const { label = '', items = [], defaultValue, onChange } = props;
  return (
    <label className="select" data-name={label}>
      <span className="select__label">{label}</span>
      <select onChange={(e) => onChange(e.target.value)} value={defaultValue}>
        <option></option>
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
};


Select.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.string,
  onChange: PropTypes.func
};
Select.defaultProps = {
  label: '',
  items: [],
  defaultValue: '',
  onChange() {}
};

export default Select;
