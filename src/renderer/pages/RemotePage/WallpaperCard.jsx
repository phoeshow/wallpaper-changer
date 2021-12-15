import React, { useState } from 'react';
import { Card, Drawer, Divider, Space, Button } from 'antd';
import { FolderOutlined } from '@ant-design/icons';

import { appDB } from '../../../database';

const { Meta } = Card;

export default function WallpaperCard({ wallpaper }) {
  const {
    id,
    thumbs,
    path,
    resolution,
    dimension_x,
    dimension_y,
    ratio,
    colors,
  } = wallpaper;

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveWallpaper = async () => {
    const wallpaper = await appDB.wallpapers.get({ id: id });
    console.log(wallpaper);
    if (wallpaper) {
      console.log('wallpaper is exist');
    } else {
      setLoading(true);
      const imageBuffer = await window.electron.got(path).buffer();
      const imageBlob = new Blob([imageBuffer]);
      await appDB.wallpapers.put({
        id,
        imageBlob,
        createTime: Date.now(),
        ratio,
        dimension_x,
        dimension_y,
        resolution,
        originalPath: path,
      });
      setLoading(false);
    }
  };

  return (
    <div className="remote-gallery-card-wrap" key={wallpaper.id}>
      <Card
        hoverable={true}
        width={300}
        cover={
          <img
            className="remote-gallery-card-cover"
            src={thumbs.large}
            alt="wallpaper"
          />
        }
        onClick={() => {
          setIsDrawerVisible(true);
        }}
        bodyStyle={{ padding: '8px 12px' }}
      >
        <Meta
          title={
            <section className="remote-wallpapercard-colorinfo">
              {colors.map((color) => {
                return (
                  <div
                    key={color}
                    style={{
                      height: '12px',
                      width: '12px',
                      backgroundColor: color,
                    }}
                  />
                );
              })}
              <div style={{ flex: 1 }}></div>
              <span>{resolution}</span>
            </section>
          }
        />
      </Card>
      <Drawer
        title="Wallpaper preview"
        placement="left"
        closable={false}
        onClose={() => {
          setIsDrawerVisible(false);
        }}
        visible={isDrawerVisible}
        getContainer={document.querySelector('.app-page-wrap')}
        style={{ position: 'absolute' }}
        destroyOnClose={true}
        extra={
          <Space>
            <Button
              onClick={handleSaveWallpaper}
              icon={<FolderOutlined />}
              loading={loading}
            >
              保存
            </Button>
          </Space>
        }
      >
        <section>
          <img
            style={{ width: '100%', height: 'auto' }}
            src={path}
            alt="preview-wallpaper"
          />
        </section>
        <Divider />
        <section>
          <h3>尺寸：</h3>
          <p>{resolution}</p>
          <h3>图片地址：</h3>
          <p>{path}</p>
        </section>
      </Drawer>
    </div>
  );
}
