import { createGraphNode } from 'graph-state';
import shouldRefresh from './should-refresh';
import refreshInterval from './refresh-interval';
import shouldRefreshOnFocus from './should-refresh-on-focus';
import refresh from './refresh';

const refreshEffect = createGraphNode<void>({
  get: ({ get, set, subscription }) => {
    const revalidate = () => {
      set(refresh, true);
    };

    const refreshFlag = get(shouldRefresh);

    if (refreshFlag) {
      const refreshMs = get(refreshInterval);

      subscription(() => {
        const interval = setInterval(revalidate, refreshMs);

        return () => {
          clearInterval(interval);
        };
      });
    }

    const focusFlag = get(shouldRefreshOnFocus);

    if (focusFlag) {
      subscription(() => {
        window.addEventListener('focus', revalidate, false);

        return () => {
          window.removeEventListener('focus', revalidate, false);
        };
      });
    }
  },
});

export default refreshEffect;
