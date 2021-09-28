import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { TimelineContextProvider } from './contexts/timeline';
import { Header, TimelineTable, TimelineForm } from './components';

const App = (props) => {
  useEffect(() => {
    props.init();
  }, []);

  return (
    <TimelineContextProvider>
      <div className="app-container">
        <Header />
        <div className="app-body">
          <TimelineTable />
          <TimelineForm />
        </div>
      </div>
    </TimelineContextProvider>
  );
};

App.propTypes = {
  init: PropTypes.func,
};
App.defaultProps = {
  init() {},
};

export { App };

export default App;
