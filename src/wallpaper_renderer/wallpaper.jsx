import React, { useEffect, useState } from 'react';
import { appDB } from '../database';

const { displayId } = window.electron;

export default function () {
  const [wallpaperInfo, setWallpaperInfo] = useState({});
  const { imageBlob, fillType, backgroundColor } = wallpaperInfo;

  useEffect(() => {
    const fn = async () => {
      const [settings, wallpapers] = await Promise.all([
        appDB.settings.toArray(),
        appDB.wallpapers.toArray(),
      ]);

      const displays = settings.find(
        (setting) => setting.key === 'displays'
      ).value;

      const currentDisplaySetting = displays.find(
        (display) => display.id === displayId
      );

      const { wallpaperSettting } = currentDisplaySetting;
      const { backgroundColor, wallpaper, fillType } = wallpaperSettting;
      const { imageBlob } =
        wallpapers.find((wallpaperItem) => wallpaperItem.id === wallpaper) ||
        {};
      setWallpaperInfo({ imageBlob, fillType, backgroundColor });
    };
    fn();

    window.electron.receive('screenWallpaper:refresh', () => {
      fn();
    });
  }, []);

  if (imageBlob) {
    let blobImageSrc = window.URL.createObjectURL(imageBlob);
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundImage: `url('${blobImageSrc}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <img
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: fillType,
            backdropFilter: 'blur(25px)',
          }}
          src={blobImageSrc}
        />
      </div>
    );
  }

  return null;
}
