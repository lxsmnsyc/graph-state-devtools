import { Network } from 'vis-network/standalone/esm';

export function moveNetworkViewToNode(
  instance: Network,
  id: string,
): void {
  // Capture current position
  instance.moveTo({
    scale: instance.getScale(),
    position: instance.getViewPosition(),
  });
  instance.fit({
    nodes: [id],
    animation: true,
  });
}

export function selectNode(
  instance: Network,
  id: string,
): void {
  instance.selectNodes([id], true);
}
