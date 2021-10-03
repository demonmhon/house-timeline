import React from 'react';
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
  return (
    <div className="timeline__area-legend" data-area={name}>
      {name}
    </div>
  );
};

const PeopleTimeBlock = (props = {}) => {
  const { area, hasOther } = props;
  return (
    <div
      className="timeline__people-time-block"
      data-tracked={!!area}
      data-has-other={hasOther}
      data-area={area}
    >
      {hasOther ? '!' : ''}
    </div>
  );
};

export const TimelineTable = (props) => {
  const { hours, timeline, peoples, areas } = props;
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
          {hours.map((h) => {
            return (
              <div key={h} data-hour={h} className="timeline__hour-block">
                <HourLabel>{h}</HourLabel>
                <div key={h} data-hour={h} className="timeline__used-block">
                  {peoples.map((name) => {
                    const at = _.get(timeline, `${name}.${h}`, '');
                    const others = peoples.filter((p) => p !== name);
                    const hasOther = at
                      ? others.filter(
                          (other) => _.get(timeline, `${other}.${h}`) === at
                        ).length > 0
                      : false;
                    return (
                      <PeopleTimeBlock
                        key={`${name}-${h}`}
                        hasOther={hasOther}
                        area={at}
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

const TimelineTableWithContext = () => {
  const { hours, timeline, peoples, areas } = useTimelineContext();
  const props = { hours, timeline, peoples, areas };
  return <TimelineTable {...props} />;
};

TimelineTable.defaultProps = {
  timeline: {},
  peoples: [],
  areas: [],
  hours: [],
};
TimelineTable.propTypes = {
  timeline: PropTypes.object,
  peoples: PropTypes.arrayOf(PropTypes.string),
  areas: PropTypes.arrayOf(PropTypes.string),
  hours: PropTypes.arrayOf(PropTypes.string),
};

export default TimelineTableWithContext;
