import { node } from 'graph-state';

const refreshInterval = node({
  get: 100,
});

export default refreshInterval;
