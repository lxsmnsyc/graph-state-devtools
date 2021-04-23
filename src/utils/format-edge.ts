import { GraphNodeKey } from 'graph-state';
import { DataSet } from 'vis-data';
import { DataEdge } from '../nodes/edges';
import { formatNodeId } from './format-node';
import { GraphNodeDebugTuple } from './read-memory';

export function formatEdgeId(
  from: GraphNodeKey,
  to: GraphNodeKey,
): string {
  return `Edge(from: ${from}, to: ${to})`;
}

export function formatEdge(
  edges: DataSet<DataEdge>,
  memory: GraphNodeDebugTuple[],
): void {
  const marked = new Set();

  memory.forEach(([key, node]) => {
    node.dependents.forEach((dependency) => {
      const id = formatEdgeId(key, dependency);
      marked.add(id);

      // edges.update({
      //   id,
      //   from: formatNodeId(dependency),
      //   to: formatNodeId(node.id),
      //   arrows: 'to',
      // });
      edges.update({
        id,
        from: formatNodeId(key),
        to: formatNodeId(dependency),
        arrows: 'to',
      });
    });
  });

  edges.getIds({
    filter: (item) => !marked.has(item.id),
  }).forEach((edge) => {
    edges.remove(edge);
  });
}
