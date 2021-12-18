import React, { useEffect, useRef } from 'react';
import { Card, Button, Modal } from 'antd';
import {
  DeleteOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setWallpaperId, openDrawer } from '../../store/localSlice';
import { appDB } from '../../../database';
import { refreshWallpapersWindow } from '../../helper/screen';

const { confirm } = Modal;

export default function ({ wallpaper }) {
  const { id, createTime, thumb, resolution, originalPath } = wallpaper;
  let blobImageSrc = window.URL.createObjectURL(thumb);

  const imageRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    imageRef.current.onload = () => {
      window.URL.revokeObjectURL(blobImageSrc);
    };
  }, []);

  const handleSetting = () => {
    // 打开详情设置抽屉
    dispatch(openDrawer());
    setTimeout(() => {
      dispatch(setWallpaperId(id));
    }, 0);
  };

  const handleDeleteWallpaper = async () => {
    confirm({
      title: 'Do you want to delete this wallpaper?',
      icon: <ExclamationCircleOutlined />,
      content:
        'When clicked the OK button, this wallpaper data and settings will clear!',
      onOk() {
        return new Promise((resolve, reject) => {
          appDB.wallpapers
            .where('id')
            .equals(id)
            .delete()
            .then(() => {
              refreshWallpapersWindow();
              resolve();
            })
            .catch(reject);
        }).catch((err) => console.error(err));
      },
      onCancel() {},
    });
  };

  return (
    <div className="local-page-wallpapercard-wrap">
      <Card
        bodyStyle={{ padding: 0 }}
        actions={[
          <SettingOutlined onClick={handleSetting} />,
          <DeleteOutlined onClick={handleDeleteWallpaper} />,
        ]}
        cover={
          <img
            ref={imageRef}
            className="local-page-wallpapercard-image"
            src={blobImageSrc}
          />
        }
      ></Card>
    </div>
  );
}
