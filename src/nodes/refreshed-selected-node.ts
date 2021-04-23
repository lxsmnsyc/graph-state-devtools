import { node } from 'graph-state';

import nodes, { DataNode } from './nodes';
import networkSelectedNode from './network-selected-node';

interface RefreshedSelectedNode {
  node?: DataNode;
}

const refreshedSelectedNode = node<RefreshedSelectedNode>({
  get: ({ get }) => {
    const id = get(networkSelectedNode);
    return {
      node: id ? get(nodes).get(id) ?? undefined : undefined,
    };
  },
});

export default refreshedSelectedNode;
