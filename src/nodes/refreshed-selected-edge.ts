import { createGraphNode } from 'graph-state';

import edges, { DataEdge } from './edges';
import networkSelectedEdge from './network-selected-edge';
import refresh from './refresh';

interface RefreshedEdge {
  edge?: DataEdge;
}

const refreshedSelectedEdge = createGraphNode<RefreshedEdge>({
  get: ({ get }) => {
    get(refresh);
    const id = get(networkSelectedEdge);
    return {
      edge: id ? get(edges).get(id) ?? undefined : undefined,
    };
  },
});

export default refreshedSelectedEdge;
