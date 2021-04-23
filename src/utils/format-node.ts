import { AutoCompleteOption } from '@geist-ui/react/dist/auto-complete/auto-complete';
import { GraphNodeKey } from 'graph-state';
import { DataSet } from 'vis-data';
import { DataNode } from '../nodes/nodes';
import { GraphNodeDebugTuple } from './read-memory';

export function formatNodeId(id: GraphNodeKey): string {
  return `GraphNode(id: ${id})`;
}

export function formatNode(
  nodes: DataSet<DataNode>,
  memory: GraphNodeDebugTuple[],
): void {
  const marked = new Set();
  memory.forEach(([key, node]) => {
    const id = formatNodeId(key);
    marked.add(id);

    nodes.update({
      label: `${key}`,
      value: node.dependencies.length + 1,
      ...node,
      dependencies: node.dependencies.map(formatNodeId),
      dependents: node.dependents.map(formatNodeId),
      listeners: node.listeners,
      id,
    });
  });

  nodes.getIds({
    filter: (item) => !marked.has(item.id),
  }).forEach((edge) => {
    nodes.remove(edge);
  });
}

export function formatNodeAutoComplete(
  memory: GraphNodeDebugTuple[],
): AutoCompleteOption[] {
  return memory.map(([key]) => ({
    label: `${key}`,
    value: `${key}`,
  }));
}

export function formatMemoryAutoComplete(
  memory: string[],
): AutoCompleteOption[] {
  return memory.map((key) => ({
    label: `${key}`,
    value: `${key}`,
  }));
}
