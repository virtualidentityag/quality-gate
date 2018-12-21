
declare interface IndexObject<T> {
  [key: string]: T;
}

declare interface IndexObjectAny extends IndexObject<any> {}

// FIXME: Typescript limitation on importing deconstructed json files
// declare module '*.json' {
//   const content: IndexObjectAny;
//   export = content;
// }
declare module '*.json';
