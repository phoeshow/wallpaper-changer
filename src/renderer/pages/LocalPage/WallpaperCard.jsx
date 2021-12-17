import React, { useEffect, useRef } from 'react';
import { Card } from 'antd';
import { appDB } from '../../../database';
import { refreshWallpapersWindow } from '../../helper/screen';

export default function ({ wallpaper }) {
  const { id, createTime, imageBlob, resolution, originalPath } = wallpaper;
  const imageRef = useRef(null);
  let blobImageSrc = window.URL.createObjectURL(imageBlob);
  useEffect(() => {
    imageRef.current.onload = () => {
      // 加载完成 释放掉内存空间
      window.URL.revokeObjectURL(blobImageSrc);
    };
  }, []);

  const handleUseItClick = async () => {
    const { value } = await appDB.settings.get({ key: 'displays' });
    console.log('------', value);
    value[0].wallpaperSettting.wallpaper = id;
    await appDB.settings.put({ key: 'displays', value });

    refreshWallpapersWindow();
  };

  const handleDownload = () => {
    window.electron.ipcRenderer.send('application:download_image', {
      url: originalPath,
    });
  };

  return (
    <div className="local-page-wallpapercard-wrap">
      <Card
        actions={[
          <span onClick={handleUseItClick}>use it</span>,
          <span onClick={handleDownload}>download</span>,
        ]}
      >
        <img
          ref={imageRef}
          className="local-page-wallpapercard-image"
          src={blobImageSrc}
        />
      </Card>
    </div>
  );
}
