import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

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
  const { name } = props;
  return <div className="timeline__label--people">{name}</div>;
};

const HourLabel = (props = {}) => {
  return <div className="timeline__label--hour">{props.children}</div>;
};

const AreaLagend = (props = {}) => {
  const { name } = props;
  return <div className="timeline__area-legend" data-area={name}>{name}</div>;
};

const PeopleTimeBlock = (props = {}) => {
  const { area } = props;
  return (
    <div
      className="timeline__people-time-block"
      data-tracked={!!area}
      data-area={area}
    ></div>
  );
};

const TimelineTable = (props) => {
  const { timeline, peoples, areas } = useTimelineContext();
  return (
    <div className="timeline">
      <h2>Timeline</h2>
      <div className="timeline-container">
        <div className="timeline__peoples">
          {peoples.map((name) => (
            <PeopleLabel key={name} name={name} />
          ))}
        </div>
        <div className="timeline__time-table">
          {hourTimeline.map((h) => {
            return (
              <div key={h} data-hour={h} className="timeline__hour-block">
                <HourLabel>{h}</HourLabel>
                <div key={h} data-hour={h} className="timeline__used-block">
                  {peoples.map((name) => {
                    return (
                      <PeopleTimeBlock
                        key={`${h}${name}`}
                        area={_.get(timeline, `${name}.${h}`, '')}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="timeline__area-legends">
        {areas.map((name) => (
          <AreaLagend key={name} name={name} />
        ))}
      </div>
    </div>
  );
};

TimelineTable.propTypes = {};
TimelineTable.defaultProps = {};

export default TimelineTable;
