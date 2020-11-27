import { createGraphNode } from 'graph-state';

import edges, { DataEdge } from './edges';
import networkSelectedId from './network-selected-id';
import refresh from './refresh';
import refreshEffect from './refresh-effect';

interface RefreshedEdge {
  edge?: DataEdge;
}

const refreshedSelectedEdge = createGraphNode<RefreshedEdge>({
  get: ({ get }) => {
    get(refresh);
    get(refreshEffect);
    const id = get(networkSelectedId);
    return {
      edge: id ? get(edges).get(id) ?? undefined : undefined,
    };
  },
});

export default refreshedSelectedEdge;
