import React, { useRef, useEffect, useState } from 'react';
import {
  useGraphNodeValue,
  useGraphNodeDispatch,
} from 'react-graph-state';

import { AutoComplete, Description } from '@geist-ui/react';
import { AutoCompleteOption } from '@geist-ui/react/dist/auto-complete/auto-complete';

import networkSelected from './nodes/network-selected';
import nodeSearchSelected from './nodes/node-search-selected';
import { nodeSearchDataResource } from './nodes/node-search-data';

import { formatNodeId } from './utils/format-node';

function NodeSearchInput(): JSX.Element {
  const searchData = useGraphNodeValue(nodeSearchDataResource);
  const selected = useGraphNodeValue(nodeSearchSelected);
  const setSelected = useGraphNodeDispatch(networkSelected);

  const initial = useRef(true);

  useEffect(() => {
    initial.current = false;
  }, []);

  const pending = initial.current && searchData.status === 'pending';

  const options = useRef<AutoCompleteOption[] | undefined>(undefined);
  const [filtered, setFiltered] = useState<AutoCompleteOption[]>();

  if (searchData.status === 'success') {
    options.current = searchData.data;
  }

  return (
    <AutoComplete
      value={selected}
      searching={pending}
      disabled={pending}
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
          setFiltered(options.current);
        } else {
          setFiltered(options.current?.filter(
            (item) => item.value.includes(value),
          ));
        }
      }}
    />
  );
}

export default function NodeSearch(): JSX.Element {
  return (
    <div className="SidebarContentSection">
      <Description
        title="Graph Node Search"
        content={<NodeSearchInput />}
      />
    </div>
  );
}
