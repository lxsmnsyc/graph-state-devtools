import {
  node,
} from 'graph-state';

import {
  AutoCompleteOption,
} from '@geist-ui/react/dist/auto-complete/auto-complete';

import memoryKeys from './memory-keys';

import { formatMemoryAutoComplete } from '../utils/format-node';

const memorySearchData = node<AutoCompleteOption[] | undefined>({
  key: 'memorySearchData',
  get: (context) => {
    const currentMemory = context.get(memoryKeys.resource);
    if (currentMemory.status === 'success') {
      return formatMemoryAutoComplete(currentMemory.data);
    }
    if (currentMemory.status === 'pending') {
      return undefined;
    }
    return [];
  },
});

export default memorySearchData;
