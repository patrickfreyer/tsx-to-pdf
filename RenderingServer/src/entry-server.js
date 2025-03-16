
      import React from 'react';
      import ReactDOMServer from 'react-dom/server';

      export function render(Component) {
        return ReactDOMServer.renderToString(
          React.createElement(Component)
        );
      }
    