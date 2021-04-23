import { node } from 'graph-state';
import { DataSet } from 'vis-data';

export interface DataNode {
  id: string;
  label: string;
  value: number;
  dependencies: string[];
  dependents: string[];
  state?: any;
  listeners: number;
}

const nodes = node({
  get: new DataSet<DataNode>([]),
});

export default nodes;
