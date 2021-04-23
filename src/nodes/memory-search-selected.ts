import { node } from 'graph-state';

const memorySearchSelected = node<string | undefined>({
  get: undefined,
});

export default memorySearchSelected;
