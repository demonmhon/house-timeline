import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  useTimelineContext,
} from '../contexts/timeline';

const propTypes = {};
const defaultProps = {};

const TimelineTable = (props) => {
  const data = useTimelineContext();
  return (
    <>
      <pre style={{ fontSize: '12px' }}>{JSON.stringify(data, null, '  ')}</pre>
    </>
  );
};

TimelineTable.propTypes = propTypes;
TimelineTable.defaultProps = defaultProps;

export default TimelineTable;
