import { node } from 'graph-state';

const networkContainer = node<HTMLDivElement | null>({
  get: null,
});

export default networkContainer;
