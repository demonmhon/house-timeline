import React from 'react';

import { TimelineContextProvider } from './contexts/timeline';
import { Header, TimelineTable, TimelineForm } from './components';

const App = () => {
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

export { App };

export default App;
