import { GraphNodeKey } from 'graph-state';
import superjson from 'superjson';

superjson.registerCustom<string, string>({
  isApplicable: (v): v is string => typeof v === 'string',
  serialize: (v) => v,
  deserialize: (v) => v,
}, 'function');
superjson.registerCustom<string, string>({
  isApplicable: (v): v is string => typeof v === 'string',
  serialize: (v) => v,
  deserialize: (v) => v,
}, 'promise');

interface ChromeInspectedWindow {
  eval: <T>(key: string, result: (data: T, exception: Error) => void) => void;
}

interface ChromeDevtools {
  inspectedWindow: ChromeInspectedWindow;
}

interface Chrome {
  devtools: ChromeDevtools;
}

declare const chrome: Chrome;

export function getMemoryKeys(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.eval<string[]>(
      'Array.from(window.__GRAPH_STATE__.keys())',
      (result, exception) => {
        if (exception) {
          reject(exception);
        } else {
          resolve(result);
        }
      },
    );
  });
}

export function getMemoryDataKeys(key: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.eval<string[]>(
      `Array.from(window.__GRAPH_STATE__.get("${key}").keys())`,
      (result, exception) => {
        if (exception) {
          reject(exception);
        } else {
          resolve(result);
        }
      },
    );
  });
}

export interface GraphNodeDebugData {
  state?: any;
  dependents: GraphNodeKey[];
  dependencies: GraphNodeKey[];
  listeners: number;
}

export type GraphNodeDebugTuple = [GraphNodeKey, GraphNodeDebugData];

export function getMemoryData(memory: string): Promise<GraphNodeDebugTuple[]> {
  return new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.eval<[string, string][]>(
      `Array.from(window.__GRAPH_STATE__.get("${memory}"))`,
      (result, exception) => {
        if (exception) {
          reject(exception);
        } else {
          resolve(result.map(([key, value]) => ([
            key,
            superjson.parse(value),
          ])));
        }
      },
    );
  });
}
