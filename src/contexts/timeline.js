import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initData = {
  '0000': {
    occupiedRoom: {
      livingRoom: [''],
      kitchen: [''],
      backyard: [''],
    },
  },
  '0030': {
    occupiedRoom: {
      livingRoom: [''],
      kitchen: [''],
      backyard: [''],
    },
  },
};

export const TimelineContext = createContext({});

export const TimelineContextProvider = ({ children }) => {
  const [data, setData] = useState(initData);

  const store = {
    data: data,
  };

  return (
    <TimelineContext.Provider value={store}>
      {children}
    </TimelineContext.Provider>
  );
};

TimelineContextProvider.defaultProps = {
  children: PropTypes.node.isRequired,
};

const useTimelineContext = () => useContext(TimelineContext);

export { useTimelineContext };
export default TimelineContextProvider;
