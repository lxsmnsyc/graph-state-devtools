import React, { useState } from 'react';
import {
  useGraphNodeValue,
  useGraphNodeDispatch,
  useGraphNodeState,
} from 'react-graph-state';

import { AutoComplete, Description, Spacer } from '@geist-ui/react';
import { AutoCompleteOption } from '@geist-ui/react/dist/auto-complete/auto-complete';

import networkSelected from './nodes/network-selected';
import nodeSearchSelected from './nodes/node-search-selected';
import nodeSearchData from './nodes/node-search-data';
import memorySearchData from './nodes/memory-search-data';
import memorySearchSelected from './nodes/memory-search-selected';

import { formatNodeId } from './utils/format-node';

function MemorySearchInput(): JSX.Element {
  const searchData = useGraphNodeValue(memorySearchData);
  const [selected, setSelected] = useGraphNodeState(memorySearchSelected);

  const [filtered, setFiltered] = useState<AutoCompleteOption[]>(searchData || []);

  return (
    <AutoComplete
      value={selected}
      searching={!searchData}
      disabled={!searchData}
      placeholder="Find memory by key"
      options={filtered}
      onSelect={(value) => {
        setSelected(value);
      }}
      onSearch={(value) => {
        if (!value) {
          setFiltered(searchData ?? []);
        } else {
          setFiltered(searchData?.filter(
            (item) => item.value.includes(value),
          ) ?? []);
        }
      }}
    />
  );
}

function NodeSearchInput(): JSX.Element {
  const searchData = useGraphNodeValue(nodeSearchData);
  const selected = useGraphNodeValue(nodeSearchSelected);
  const setSelected = useGraphNodeDispatch(networkSelected);

  const [filtered, setFiltered] = useState<AutoCompleteOption[]>(searchData ?? []);

  return (
    <AutoComplete
      value={selected}
      searching={!searchData}
      disabled={!searchData}
      placeholder="Find node by label/id."
      options={filtered}
      onSelect={(value) => {
        setSelected({
          type: 'node',
          id: formatNodeId(value),
        });
      }}
      onSearch={(value) => {
        if (!value) {
          setFiltered(searchData ?? []);
        } else {
          setFiltered(searchData?.filter(
            (item) => item.value.includes(value),
          ) ?? []);
        }
      }}
    />
  );
}

export default function NodeSearch(): JSX.Element {
  return (
    <div className="SidebarContentSection">
      <Description
        title="Graph Memory Search"
        content={<MemorySearchInput />}
      />
      <Spacer />
      <Description
        title="Graph Node Search"
        content={<NodeSearchInput />}
      />
    </div>
  );
}
