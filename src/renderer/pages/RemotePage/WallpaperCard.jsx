import React, { useState } from 'react';
import { Card, Drawer, Divider, Space, Button, message, Progress } from 'antd';
import { FolderOutlined } from '@ant-design/icons';

import { appDB } from '../../../database';
import { useLiveQuery } from 'dexie-react-hooks';
import throttle from 'lodash/throttle';

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
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [wallpaperFileSize, setWallpaperFileSize] = useState(0);
  const [downloadFileSize, setDownloadFileSize] = useState(0);
  const [showDownloadProgress, setShowDownloadProgress] = useState(false);

  const dbWallpaper = useLiveQuery(() => appDB.wallpapers.get({ id: id }));

  const handleSaveWallpaper = async () => {
    setLoading(true);
    setShowDownloadProgress(true);
    const imageFetcher = window.electron.got(path);
    const imageThumbFetcher = window.electron.got(thumbs.large);
    imageFetcher.on(
      'downloadProgress',
      throttle(
        (progress) => {
          // {percent: 0.1037435533869914, transferred: 22389, total: 215811}
          setDownloadProgress(Math.round(progress.percent * 100));
          setDownloadFileSize(Math.ceil((progress.transferred || 0) / 1024));
          setWallpaperFileSize(Math.ceil((progress.total || 0) / 1024));

          if (progress.percent === 1) {
            setTimeout(() => {
              setShowDownloadProgress(false);
            }, 300);
          }
        },
        200,
        { trailing: true }
      )
    );
    const [imageBuffer, imageThumbBuffer] = await Promise.all([
      imageFetcher.buffer(),
      imageThumbFetcher.buffer(),
    ]);
    const imageBlob = new Blob([imageBuffer]);
    const imageThumbBlob = new Blob([imageThumbBuffer]);
    await appDB.wallpapers.put({
      id,
      imageBlob,
      createTime: Date.now(),
      ratio,
      dimension_x,
      dimension_y,
      resolution,
      originalPath: path,
      thumb: imageThumbBlob,
    });
    setLoading(false);
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
              disabled={dbWallpaper}
            >
              {dbWallpaper ? 'Favourited' : 'Favourite'}
            </Button>
          </Space>
        }
      >
        <section>
          <img
            style={{ width: '100%', height: 'auto' }}
            src={thumbs.original}
            alt="preview-wallpaper"
          />
        </section>
        <Divider />
        <section
          className="remote-wallpaper-download-progress"
          style={{ maxHeight: showDownloadProgress ? '44px' : 0 }}
        >
          <Progress percent={downloadProgress} size="small" />
          <section style={{ textAlign: 'center' }}>
            {downloadFileSize}kB/{wallpaperFileSize}kB
          </section>
        </section>
        <section>
          <h3>Size</h3>
          <p>{resolution}</p>
          <h3>Original Path</h3>
          <p>{path}</p>
        </section>
      </Drawer>
    </div>
  );
}
