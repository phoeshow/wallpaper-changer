import React from 'react';
import { Button, Space } from 'antd';
import {
  CloseSquareOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';

export default function () {
  const handleClose = () => {
    window.electron.ipcRenderer.send('application:hide');
  };
  const handleMin = () => {
    window.electron.ipcRenderer.send('application:min');
  };
  return (
    <Space>
      <Button type="text" icon={<MinusSquareOutlined />} onClick={handleMin} />
      <Button
        type="text"
        icon={<CloseSquareOutlined />}
        onClick={handleClose}
      />
    </Space>
  );
}
