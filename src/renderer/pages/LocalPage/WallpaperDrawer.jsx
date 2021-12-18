import React, { useEffect, useState } from 'react';
import { Drawer, Space, Divider, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsDrawerOpen,
  selectWallpaperId,
  closeDrawer,
} from '../../store/localSlice';

import { refreshWallpapersWindow } from '../../helper/screen';

import { appDB } from '../../../database';

const WallpaperDrawer = () => {
  const isDrawerOpen = useSelector(selectIsDrawerOpen);
  const wallpaperId = useSelector(selectWallpaperId);

  const [imageSrc, setImageSrc] = useState(null);
  const [displays, setDisplays] = useState([]);

  const dispatch = useDispatch();

  useEffect(async () => {
    const [wallpaper, displays] = await Promise.all([
      appDB.wallpapers.get({ id: wallpaperId }),
      appDB.settings.get({ key: 'displays' }),
    ]);

    if (wallpaper) {
      const { imageBlob } = wallpaper;
      setImageSrc(window.URL.createObjectURL(imageBlob));
      setDisplays(displays.value);
    }
  }, [wallpaperId]);

  const handleCloseDrawer = () => {
    imageSrc && window.URL.revokeObjectURL(imageSrc);
    setImageSrc(null);
    setDisplays([]);
    dispatch(closeDrawer());
  };

  const setWallpaper = (displayId) => () => {
    const fn = async () => {
      let { value: deviceDisplays } = await appDB.settings.get({
        key: 'displays',
      });
      deviceDisplays.forEach((screen) => {
        if (screen.id === displayId) {
          screen.wallpaperSettting.wallpaper = wallpaperId;
        }
      });

      await appDB.settings.put({ key: 'displays', value: deviceDisplays });

      refreshWallpapersWindow();
    };

    fn();
  };

  const handleDownload = async () => {
    const { originalPath } = await appDB.wallpapers.get({ id: wallpaperId });
    window.electron.ipcRenderer.send('application:download_image', {
      url: originalPath,
    });
  };

  return (
    <Drawer
      title="Wallpaper preview"
      placement="left"
      closable={false}
      onClose={handleCloseDrawer}
      visible={isDrawerOpen}
      getContainer={document.querySelector('.app-page-wrap')}
      style={{ position: 'absolute' }}
    >
      <section>
        {imageSrc ? (
          <img
            style={{ width: '100%', height: 'auto' }}
            src={imageSrc}
            alt="preview-wallpaper"
          />
        ) : null}
      </section>
      <Divider />
      <section>
        <Space>
          {displays.map((display, idx) => {
            return (
              <Button onClick={setWallpaper(display.id)} key={display.id}>
                Set Screen {idx}
              </Button>
            );
          })}
        </Space>
        <Divider />
        <Space>
          <Button onClick={handleDownload}>Download</Button>
        </Space>
      </section>
    </Drawer>
  );
};

export default WallpaperDrawer;
