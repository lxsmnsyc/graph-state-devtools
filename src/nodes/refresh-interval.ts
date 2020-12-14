import { createGraphNode } from 'graph-state';

const refreshInterval = createGraphNode({
  get: 100,
});

export default refreshInterval;
