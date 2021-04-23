import { node } from 'graph-state';

import edges, { DataEdge } from './edges';
import networkSelectedEdge from './network-selected-edge';

interface RefreshedEdge {
  edge?: DataEdge;
}

const refreshedSelectedEdge = node<RefreshedEdge>({
  get: ({ get }) => {
    const id = get(networkSelectedEdge);
    return {
      edge: id ? get(edges).get(id) ?? undefined : undefined,
    };
  },
});

export default refreshedSelectedEdge;
