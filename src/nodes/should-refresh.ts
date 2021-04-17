import { node } from 'graph-state';

const shouldRefresh = node<boolean>({
  get: true,
});

export default shouldRefresh;
