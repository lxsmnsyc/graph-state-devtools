import { node } from 'graph-state';

import networkSelected from './network-selected';

const networkSelectedId = node<string | undefined>({
  get: ({ get }) => get(networkSelected)?.id,
});

export default networkSelectedId;
