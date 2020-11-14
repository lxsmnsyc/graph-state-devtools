import { createGraphNode } from 'graph-state';

const refreshInterval = createGraphNode({
  get: 5000,
});

export default refreshInterval;
