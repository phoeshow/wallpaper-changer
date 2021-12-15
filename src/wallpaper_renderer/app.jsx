import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Wallpaper from './wallpaper';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Wallpaper />
    </React.StrictMode>,
    document.querySelector('#root')
  );
}

render();
