import React, { useEffect, useRef } from 'react';
import { Card } from 'antd';
import { appDB } from '../../database';

export default function ({ wallpaper }) {
  const { id, createTime, imageBlob, resolution } = wallpaper;
  const imageRef = useRef(null);
  let blobImageSrc = window.URL.createObjectURL(imageBlob);
  useEffect(() => {
    imageRef.current.onload = () => {
      // 加载完成 释放掉内存空间
      window.URL.revokeObjectURL(blobImageSrc);
    };
  }, []);

  const handleUseItClick = async () => {
    await appDB.setting.put({ name: 'currentWallpaperID', value: id });
  };

  return (
    <div className="local-page-wallpapercard-wrap">
      <Card actions={[<span onClick={handleUseItClick}>use it</span>]}>
        <img
          ref={imageRef}
          className="local-page-wallpapercard-image"
          src={blobImageSrc}
        />
      </Card>
    </div>
  );
}
