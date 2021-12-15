import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './layout.css';

import Brand from './components/Brand';
import Navigator from './components/Navigator';

const Layout = () => {
  return (
    <main className="app-main">
      <header className="app-header">
        <Brand />
        <Navigator />
        <div className="header-space"></div>
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
