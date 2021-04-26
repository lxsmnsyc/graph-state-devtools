import React from 'react';
import { GeistProvider, CssBaseline } from '@geist-ui/react';

import NetworkVisualizer from './NetworkVisualizer';
import Sidebar from './Sidebar';

import { EcmasonViewSettings } from './models/EcmasonViewSettings';

import './AppContainer.css';

export default function AppContainer(): JSX.Element {
  return (
    <GeistProvider themeType="dark">
      <CssBaseline />
      <EcmasonViewSettings.Provider>
        <div className="AppContainer">
          <NetworkVisualizer />
          <Sidebar />
        </div>
      </EcmasonViewSettings.Provider>
    </GeistProvider>
  );
}
