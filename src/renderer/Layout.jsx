import React from 'react';
import { Outlet } from 'react-router-dom';
import './layout.css';

import Brand from './components/Brand';
import Navigator from './components/Navigator';
import ControlBtn from './components/ControlBtn';

const Layout = () => {
  return (
    <main className="app-main">
      <header className="app-header">
        <Brand />
        <Navigator />
        <div className="header-space"></div>
        <ControlBtn />
      </header>

      <section className="app-page-wrap">
        <section className="inner-scroll">
          <Outlet />
        </section>
      </section>
    </main>
  );
};

export default Layout;
