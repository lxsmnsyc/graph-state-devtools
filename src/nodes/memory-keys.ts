import { swr } from 'swr-graph-state';
import { getMemoryKeys } from '../utils/read-memory';

const memoryKeys = swr({
  key: 'memoryKeys',
  setup() {
    return () => getMemoryKeys();
  },
  revalidateOnFocus: true,
  revalidateOnVisibility: true,
});

export default memoryKeys;
