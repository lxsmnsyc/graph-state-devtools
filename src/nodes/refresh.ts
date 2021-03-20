import { createGraphNode } from 'graph-state';
import shouldRefresh from './should-refresh';
import refreshInterval from './refresh-interval';
import shouldRefreshOnFocus from './should-refresh-on-focus';

const refresh = createGraphNode<number>({
  get: ({ get, setSelf, subscription }) => {
    const revalidate = () => {
      setSelf((current) => current + 1);
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

    return 0;
  },
});

export default refresh;
