import { node, ResourceResult } from 'graph-state';

import nodes from './nodes';
import edges from './edges';

import { GraphNodeDebugTuple } from '../utils/read-memory';
import { formatEdge } from '../utils/format-edge';
import { formatNode } from '../utils/format-node';
import selectedMemoryData from './selected-memory-data';

const memoryLoad = node<ResourceResult<GraphNodeDebugTuple[]>>({
  key: 'memoryLoad',
  get: (context) => {
    const currentMemory = context.get(selectedMemoryData.resource);

    if (currentMemory.status === 'success') {
      formatNode(context.get(nodes), currentMemory.data);
      formatEdge(context.get(edges), currentMemory.data);
    }

    return currentMemory;
  },
});

export default memoryLoad;
