import { GraphNodeKey } from 'graph-state';
import { addTransformer, parse, withRecursionTracker } from 'ecmason';

addTransformer<Promise<any>, null>('object', {
  tag: 'PROMISE',
  check: (value): value is Promise<any> => value instanceof Promise,
  serialize: () => null,
  deserialize: () => Promise.resolve(),
});
addTransformer<(...args: any[]) => any, string>('primitive', {
  tag: 'FUNCTION',
  check: (v): v is ((...args: any[]) => any) => typeof v === 'function',
  serialize: (v) => `ƒ ${v.name} () { }`,
  deserialize: (v) => {
    const newFunc = () => { /* noop */ };
    newFunc.name = v;
    return newFunc;
  },
});

interface ErrorECMASon {
  name: string;
  message: string;
}

addTransformer('object', withRecursionTracker<Error, ErrorECMASon>({
  tag: 'ERROR',
  check: (v): v is Error => v instanceof Error,
  serialize: (v) => ({
    name: v.name,
    message: v.message,
  }),
  deserialize: (v) => {
    const error = new Error(v.message);
    error.name = v.name;
    return error;
  },
}));

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
            parse(value),
          ])));
        }
      },
    );
  });
}
