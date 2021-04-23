import React, { useCallback } from 'react';

import {
  useGraphNodeValue,
} from 'react-graph-state';

import { Button, ButtonGroup } from '@geist-ui/react';
import { ZoomOut } from '@geist-ui/react-icons';

import network from './nodes/network';

function ZoomOutControl(): JSX.Element {
  const currentNetwork = useGraphNodeValue(network);

  const onClick = useCallback(() => {
    if (currentNetwork) {
      currentNetwork.fit({
        animation: true,
      });
    }
  }, [currentNetwork]);

  return (
    <Button
      iconRight={<ZoomOut />}
      onClick={onClick}
    />
  );
}

export default function NetworkVisualizerControls(): JSX.Element {
  return (
    <ButtonGroup>
      <ZoomOutControl />
    </ButtonGroup>
  );
}
