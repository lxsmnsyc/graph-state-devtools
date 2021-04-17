import {
  node,
  resource,
} from 'graph-state';

import {
  AutoCompleteOption,
} from '@geist-ui/react/dist/auto-complete/auto-complete';

import memoryLoad from './memory-load';

import { formatNodeAutoComplete } from '../utils/format-node';

const nodeSearchData = node<Promise<AutoCompleteOption[]>>({
  get: async ({ get }) => formatNodeAutoComplete(await get(memoryLoad)),
});

export const nodeSearchDataResource = resource(nodeSearchData);

export default nodeSearchData;
