import React from 'react';
import ReactJson from 'react-json-view';
import superjson from 'superjson';

import './StateViewer.css';

interface StateViewerProps {
  state?: any;
}

export default function StateViewer({ state }: StateViewerProps): JSX.Element {
  return (
    <div className="StateViewer">
      <ReactJson
        theme="bright"
        src={{
          state: superjson.serialize(state).json,
        }}
        indentWidth={2}
        name={null}
      />
    </div>
  );
}
