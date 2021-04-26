function init() {
  chrome.devtools.inspectedWindow.eval(
    `
    (() => {
      document.addEventListener('__GRAPH_STATE__', (event) => {
        const { type, data } = event.detail;

        if (!window.__GRAPH_STATE__) {
          console.log('__GRAPH_STATE__');
          window.__GRAPH_STATE__ = new Map();
        }

        switch (type) {
          case 'MEMORY':
            window.__GRAPH_STATE__.set(data, new Map());
            break;
          case 'NODE':
            const currentMemory = window.__GRAPH_STATE__.get(data.memory) || new Map();
            currentMemory.set(data.key, data.data);
            window.__GRAPH_STATE__.set(data.memory, currentMemory);
            break;
        }
      });
    })();
    `,
    () => {
      chrome.devtools.panels.create('graph-state', '', 'panel.html');
    },
  );
}

init();

