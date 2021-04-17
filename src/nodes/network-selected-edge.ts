import { node } from 'graph-state';

import edges from './edges';
import networkSelected from './network-selected';

const networkSelectedEdge = node<string | undefined>({
  get: ({ get }) => {
    const selected = get(networkSelected);

    if (selected && selected.type === 'edge') {
      const currentEdges = get(edges);

      const value = currentEdges.get(selected.id);

      if (value) {
        return selected.id;
      }
    }

    return undefined;
  },
});

export default networkSelectedEdge;
