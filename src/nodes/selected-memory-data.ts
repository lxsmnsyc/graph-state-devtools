import { swr } from 'swr-graph-state';
import { getMemoryData, GraphNodeDebugTuple } from '../utils/read-memory';
import selectedMemory from './memory-search-selected';

const selectedMemoryData = swr<GraphNodeDebugTuple[]>({
  key: 'selectedMemoryData',
  setup(context) {
    const currentMemory = context.get(selectedMemory);

    return async () => {
      if (currentMemory) {
        return getMemoryData(currentMemory);
      }
      return [];
    };
  },
  revalidateOnFocus: true,
  revalidateOnVisibility: true,
  refreshInterval: 2000,
});

export default selectedMemoryData;
