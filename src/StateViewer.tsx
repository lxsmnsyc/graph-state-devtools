import React from 'react';
import ReactJson from 'react-json-view';
import superjson from 'superjson';
import Inspector from './Inspector';

interface StateViewerProps<T> {
  state: T;
}

export default function StateViewer<T>({ state }: StateViewerProps<T>): JSX.Element {
  return (
    <div className="StateViewer">
      <Inspector data={state} />
    </div>
  );
}
