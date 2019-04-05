
export const mockConsole = (): void => {
  let originalLog: Console['log'];

  beforeEach((): void => {
    // eslint-disable-next-line no-console
    originalLog = console.log;
    // eslint-disable-next-line no-console
    console.log = jest.fn() as Console['log'];
  });

  afterEach((): void => {
    // eslint-disable-next-line no-console
    console.log = originalLog;
  });
};
