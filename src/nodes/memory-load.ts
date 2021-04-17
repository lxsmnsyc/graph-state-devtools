import {
  node,
  resource,
  GraphNodeDebugData,
} from 'graph-state';

import refresh from './refresh';
import nodes from './nodes';
import edges from './edges';

import readMemory from '../utils/read-memory';
import { formatEdge } from '../utils/format-edge';
import { formatNode } from '../utils/format-node';

const memoryLoad = node<Promise<GraphNodeDebugData[]>>({
  get: async ({ get }) => {
    get(refresh);

    const memory = await readMemory();

    formatNode(get(nodes), memory);
    formatEdge(get(edges), memory);

    return memory;
  },
});

export const memoryResource = resource(memoryLoad);

export default memoryLoad;
