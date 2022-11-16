import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './styles/style.scss';
import { store } from './store';
import 'utils/i18n';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
