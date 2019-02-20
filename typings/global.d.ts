
declare interface IndexObject<T> {
  [key: string]: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-empty-interface
declare interface IndexObjectAny extends IndexObject<any> {}

// FIXME: Typescript limitation on importing deconstructed json files
// declare module '*.json' {
//   const content: IndexObjectAny;
//   export = content;
// }
declare module '*.json';
