import { node } from 'graph-state';

const shouldRefreshOnFocus = node<boolean>({
  get: true,
});

export default shouldRefreshOnFocus;
