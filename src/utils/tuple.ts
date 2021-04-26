export default function tuple<T extends any[]>(...args: T): T {
  return args;
}
