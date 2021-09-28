import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'

import { useTimelineContext } from '../../contexts/timeline';
import './timeline-table.scss';

const hourTimeline = [];
const hours = Array(24)
  .fill('')
  .map((a, index) => {
    return index.toString().padStart(2, '0');
  });
hours
  .map((h) => {
    return [`${h}:00`, `${h}:30`];
  })
  .forEach((h) => {
    hourTimeline.push(...h);
  });

const PeopleLabel = (props = {}) => {
  return <div className="timeline__label--people">{props.children}</div>;
};

const HourLabel = (props = {}) => {
  return <div className="timeline__label--hour">{props.children}</div>;
};

const PeopleTimeBlock = (props = {}) => {
  const { area } = props
  return <div className="timeline__people-time-block" data-tracked={!!area} data-area={area}></div>;
};

const TimelineTable = (props) => {
  const { timeline, peoples, areas } = useTimelineContext();
  return (
    <div className="timeline-container">
      <div className="timeline__peoples">
        {peoples.map((name) => {
          return <PeopleLabel key={name}>{name}</PeopleLabel>;
        })}
      </div>
      <div className="timeline__time-table">
        {hourTimeline.map((h) => {
          return (
            <div key={h} data-hour={h} className="timeline__hour-block">
              <HourLabel>{h}</HourLabel>
              <div key={h} data-hour={h} className="timeline__used-block">
                {peoples.map((name) => {
                  return <PeopleTimeBlock key={`${h}${name}`} area={_.get(timeline, `${name}.${h}`, '')} />;
                })}
              </div>
            </div>
          );
        })}
      </div>

      <pre style={{ fontSize: '12px' }}>{JSON.stringify(timeline, null, '  ')}</pre>
    </div>
  );
};

TimelineTable.propTypes = {};
TimelineTable.defaultProps = {};

export default TimelineTable;
