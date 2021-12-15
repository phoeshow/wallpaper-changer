import React, { useEffect, useRef } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { appDB } from '../database';

const { displayId } = window.electron;

export default function () {
  const settings = useLiveQuery(() => appDB.settings.toArray());
  const wallpapers = useLiveQuery(() => appDB.wallpapers.toArray());

  const displays = settings?.find(
    (setting) => setting.key === 'displays'
  ).value;

  if (displays && wallpapers) {
    const currentDisplaySetting = displays.find(
      (display) => display.id === displayId
    );
    const { wallpaperSettting } = currentDisplaySetting;
    const { backgroundColor, wallpaper, fillType } = wallpaperSettting;
    const { imageBlob } =
      wallpapers.find((wallpaperItem) => wallpaperItem.id === wallpaper) || {};
    if (imageBlob) {
      let blobImageSrc = window.URL.createObjectURL(imageBlob);
      return (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: backgroundColor,
          }}
        >
          <img
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: fillType,
            }}
            src={blobImageSrc}
          />
        </div>
      );
    }
  }

  return null;
}
