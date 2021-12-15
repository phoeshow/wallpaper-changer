import React, { useState } from 'react';
import { Menu } from 'antd';
import { GlobalOutlined, DesktopOutlined } from '@ant-design/icons';
import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';

export default function Navigator() {
  let navigate = useNavigate();
  let [current, setCurrent] = useState('/');

  const handleClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="/remote" icon={<GlobalOutlined />}>
        Remote
      </Menu.Item>
      <Menu.Item key="/" icon={<DesktopOutlined />}>
        Local
      </Menu.Item>
    </Menu>
  );
}
