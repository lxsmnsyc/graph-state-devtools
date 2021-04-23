function init() {
  chrome.devtools.inspectedWindow.eval(
    `
    (() => {
      const store = new Map();
      window.__GRAPH_STATE__ = store;
      console.log('__GRAPH_STATE__');
      document.addEventListener('__GRAPH_STATE__', (event) => {
        const { type, data } = event.detail;

        console.log(type, data);
        switch (type) {
          case 'MEMORY':
            store.set(data, new Map());
            break;
          case 'NODE':
            const currentMemory = store.get(data.memory) || new Map();
            currentMemory.set(data.key, data.data);
            store.set(data.memory, currentMemory);
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

