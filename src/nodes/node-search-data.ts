import {
  node,
} from 'graph-state';

import {
  AutoCompleteOption,
} from '@geist-ui/react/dist/auto-complete/auto-complete';

import memoryLoad from './memory-load';

import { formatNodeAutoComplete } from '../utils/format-node';

const nodeSearchData = node<AutoCompleteOption[] | undefined>({
  key: 'nodeSearchData',
  get: (context) => {
    const currentMemory = context.get(memoryLoad);
    if (currentMemory.status === 'success') {
      return formatNodeAutoComplete(currentMemory.data);
    }
    if (currentMemory.status === 'pending') {
      return undefined;
    }
    return [];
  },
});

export default nodeSearchData;
