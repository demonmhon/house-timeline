import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useTimelineContext } from '../../contexts/timeline';
import './timeline-form.scss';

const initData = {
  name: '',
  area: '',
  from: '',
  to: '',
};

const Select = (props) => {
  const { label = '', items = [], onChange } = props;
  return (
    <label>
      <span>{label}</span>
      <select onChange={(e) => onChange(e.target.value)}>
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

const TimelineForm = (props) => {
  const [newData, setNewData] = useState({ ...initData });
  const { peoples, areas, hours } = useTimelineContext();
  const { addTime } = useTimelineContext();

  const addData = () => {
    const { name, area, from, to } = newData
    addTime(name, area, from, to)
  };

  const setForm = (field, value) => {
    setNewData({
      ...newData,
      [field]: value
    })
  };

  return (
    <div className="form">
      <h2>Timeline Entry</h2>
      <div className="form-input">
        <Select
          label={'Name'}
          items={peoples}
          onChange={(value) => setForm('name', value)}
        />
        <Select
          label={'Area'}
          items={areas}
          onChange={(value) => setForm('area', value)}
        />
        <Select
          label={'From'}
          items={hours}
          onChange={(value) => setForm('from', value)}
        />
        <Select
          label={'To'}
          items={hours}
          onChange={(value) => setForm('to', value)}
        />
        <button onClick={() => addData()}>Add</button>
      </div>
    </div>
  );
};

TimelineForm.propTypes = {};
TimelineForm.defaultProps = {};

export default TimelineForm;
