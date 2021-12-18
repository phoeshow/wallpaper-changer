import React from 'react';
import './index.css';
import { useLiveQuery } from 'dexie-react-hooks';
import { appDB } from '../../../database';

import WallpaperDrawer from './WallpaperDrawer';

import WallpaperCard from './WallpaperCard';

const LocalPage = () => {
  const wallpapers = useLiveQuery(() =>
    appDB.wallpapers.orderBy('createTime').toArray()
  );

  if (wallpapers) {
    return (
      <section className="local-page-container">
        {wallpapers.map((wallpaper) => {
          return <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />;
        })}
        <WallpaperDrawer />
      </section>
    );
  }
  return null;
};

export default LocalPage;
