import React from 'react';
import './index.css';
import { useLiveQuery } from 'dexie-react-hooks';
import { appDB } from '../../../database';

import { Button } from 'antd';

import WallpaperCard from './WallpaperCard';

const LocalPage = () => {
  const wallpapers = useLiveQuery(() =>
    appDB.wallpapers.orderBy('createTime').toArray()
  );

  // const handleClick = async () => {
  //   const res = await window.electron.ipcRenderer.invoke('get-screen', {
  //     a: 'b',
  //   });
  //   console.log(res);
  // };

  if (wallpapers) {
    return (
      <section className="local-page-container">
        {wallpapers.map((wallpaper) => {
          return <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />;
        })}
      </section>
    );
  }
  return null;
};

export default LocalPage;
