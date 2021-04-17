import { node } from 'graph-state';
import nodes from './nodes';

import network from './network';
import networkSelected from './network-selected';
import nodeSearchSelected from './node-search-selected';

import { moveNetworkViewToNode, selectNode } from '../utils/network';

const networkSelectedNode = node<string | undefined>({
  get: ({ get, set, subscription }) => {
    const selected = get(networkSelected);

    if (selected && selected.type === 'node') {
      const currentNodes = get(nodes);

      const value = currentNodes.get(selected.id);

      if (value) {
        subscription(() => {
          const timeout = setTimeout(() => {
            set(nodeSearchSelected, value.label);
          });

          return () => {
            clearTimeout(timeout);
          }
        });

        const instance = get(network);

        if (instance) {
          subscription(() => {
            const timeout = setTimeout(() => {
              selectNode(instance, selected.id);
              moveNetworkViewToNode(instance, selected.id);
            });

            return () => {
              clearTimeout(timeout);
            }
          });
        }

        return selected.id;
      }
    }

    return undefined;
  },
});

export default networkSelectedNode;
