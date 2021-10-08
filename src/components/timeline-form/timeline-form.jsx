import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Select from '../select';
import { useTimelineContext } from '../../contexts/timeline';
import './timeline-form.scss';

const initData = {
  name: '',
  area: '',
  from: '',
  to: '',
};

export const TimelineForm = (props) => {
  const [newData, setNewData] = useState({ ...initData });
  const { timeline, peoples, areas, hours } = props;
  const { addTime } = props;

  const setForm = (field, value) => {
    setNewData({
      ...newData,
      [field]: value,
    });
  };

  const addData = () => {
    const { name, area, from, to } = newData;
    const timeIndex = [hours.indexOf(from), hours.indexOf(to)];
    const timeRange = [...hours].slice(timeIndex[0], timeIndex[1]);
    if (timeRange.length <= 0) {
      alert('Invalid time selected');
      return;
    }
    const peopleTime = timeline[name];
    let hasDataIntime = false;
    timeRange.forEach((time) => {
      if (peopleTime[time]) {
        hasDataIntime = true;
      }
    });
    if (hasDataIntime) {
      if (confirm('Already has data in specified time, replace it?')) {
        addTime(name, area, from, to);
      }
    } else {
      addTime(name, area, from, to);
    }
  };

  return (
    <div className="form">
      <h2>Timeline Entry</h2>
      <div className="form__input">
        <div className="form__input-group">
          <Select
            label={'Name'}
            items={peoples}
            defaultValue={newData.name}
            onChange={(value) => setForm('name', value)}
          />
        </div>
        <div className="form__input-group">
          <Select
            label={'Area'}
            items={areas}
            defaultValue={newData.area}
            onChange={(value) => setForm('area', value)}
          />
        </div>
        <div className="form__input-group form__input-group--unset">
          <Select
            label={'From'}
            items={hours}
            defaultValue={newData.from}
            onChange={(value) => setForm('from', value)}
          />
          <Select
            label={'To'}
            items={hours}
            defaultValue={newData.to}
            onChange={(value) => setForm('to', value)}
          />
        </div>
        <button onClick={() => addData()}>&#43; Add</button>
      </div>
    </div>
  );
};

TimelineForm.defaultProps = {
  timeline: {},
  peoples: [],
  areas: [],
  hours: [],
  addTime() {},
};
TimelineForm.propTypes = {
  timeline: PropTypes.object,
  peoples: PropTypes.arrayOf(PropTypes.string),
  areas: PropTypes.arrayOf(PropTypes.string),
  hours: PropTypes.arrayOf(PropTypes.string),
  addTime: PropTypes.func,
};

const TimelineFormWithContext = () => {
  const { hours, timeline, peoples, areas, addTime, hasDataInTime } =
    useTimelineContext();
  const props = { hours, timeline, peoples, areas, addTime, hasDataInTime };
  return <TimelineForm {...props} />;
};

export default TimelineFormWithContext;
