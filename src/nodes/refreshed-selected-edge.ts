import { createGraphNode } from 'graph-state';

import edges, { DataEdge } from './edges';
import networkSelectedEdge from './network-selected-edge';
import refresh from './refresh';
import refreshEffect from './refresh-effect';

interface RefreshedEdge {
  edge?: DataEdge;
}

const refreshedSelectedEdge = createGraphNode<RefreshedEdge>({
  get: ({ get }) => {
    get(refresh);
    get(refreshEffect);
    const id = get(networkSelectedEdge);
    return {
      edge: id ? get(edges).get(id) ?? undefined : undefined,
    };
  },
});

export default refreshedSelectedEdge;
