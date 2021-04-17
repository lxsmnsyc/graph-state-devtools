import { node } from 'graph-state';

export interface NetworkSelected {
  type: 'node' | 'edge';
  id: string;
}

const networkSelected = node<NetworkSelected | null>({
  get: null,
});

export default networkSelected;
