import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './Layout';
import RemotePage from './pages/RemotePage';
import LocalPage from './pages/LocalPage';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="remote" element={<RemotePage />} />
              <Route index element={<LocalPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    </React.StrictMode>,
    document.querySelector('#root')
  );
}

render();
