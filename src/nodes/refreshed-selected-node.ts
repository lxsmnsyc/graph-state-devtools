import { createGraphNode } from 'graph-state';

import nodes, { DataNode } from './nodes';
import refresh from './refresh';
import refreshEffect from './refresh-effect';
import networkSelectedNode from './network-selected-node';

interface RefreshedSelectedNode {
  node?: DataNode;
}

const refreshedSelectedNode = createGraphNode<RefreshedSelectedNode>({
  get: ({ get }) => {
    get(refresh);
    get(refreshEffect);
    const id = get(networkSelectedNode);
    return {
      node: id ? get(nodes).get(id) ?? undefined : undefined,
    };
  },
});

export default refreshedSelectedNode;
