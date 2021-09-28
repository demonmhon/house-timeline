import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

import { TimelineContextProvider } from './contexts/timeline';
import { Header, TimelineTable } from './components';

const App = (props) => {
  useEffect(() => {
    props.init();
  }, []);

  return (
    <BrowserRouter>
      <TimelineContextProvider>
        <div className="app-container">
          <Header />
          <div className="app-body">
            <TimelineTable />
          </div>
        </div>
      </TimelineContextProvider>
    </BrowserRouter>
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
