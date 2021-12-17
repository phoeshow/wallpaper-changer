import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './Layout';
import RemotePage from './pages/RemotePage';
import LocalPage from './pages/LocalPage';

import { appDB } from '../database';
import { getDeviceDisplays, starthWallpapersWindow } from './helper/screen';

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

async function start() {
  // 检查配置中是否存在背景设置
  let displaysSetting = await appDB.settings.get({ key: 'displays' });
  let deviceDisplays;
  if (!displaysSetting) {
    deviceDisplays = await getDeviceDisplays();

    deviceDisplays.forEach((screen) => {
      screen.wallpaperSettting = {
        wallpaper: '',
        backgroundColor: '#fff',
        fillType: 'contain',
      };
    });
    await appDB.settings.put({ key: 'displays', value: deviceDisplays });
  }
  starthWallpapersWindow();
  render();
}

start();
