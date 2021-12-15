import * as React from 'react';
import * as ReactDOM from 'react-dom';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <div>Other page</div>
    </React.StrictMode>,
    document.querySelector('#root')
  );
}

render();
