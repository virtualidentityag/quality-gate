import { lint, report } from '../src/api';

describe('#lint', () => {
  const setupProjectTest = (name: string, errors: string[] = []): void => {
    describe(`project ${name}`, () => {
      let logger: jest.Mock<Console['log']>;

      beforeEach(() => {
        // eslint-disable-next-line no-console
        logger = console.log as jest.Mock<Console['log']>;
        report(lint({ pattern: `tests/example-project-${name}` }), logger);
      });

      it(`should ${errors.length ? 'fail' : 'pass'}`, () => {
        expect(logger.mock.calls).toHaveLength(errors.length);
      });

      errors.forEach((error, index) => {
        it(`should have failure number ${index + 1} be "${error}"`, () => {
          expect(logger.mock.calls[index].join(' ')).toBe(error);
        });
      });
    });
  };

  let originalLog: Console['log'];

  beforeEach(() => {
    // eslint-disable-next-line no-console
    originalLog = console.log;
    // eslint-disable-next-line no-console
    console.log = jest.fn() as Console['log'];
  });

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.log = originalLog;
  });

  setupProjectTest('one', [
    './tests/example-project-one/index.js [1, 1]: Too many blank lines at the beginning of file. Max of 2 allowed. (no-multiple-empty-lines)',
    './tests/example-project-one/index.js [4, 1]: Unexpected console statement. (no-console)',
    './tests/example-project-one/index.js [4, 36]: Missing semicolon. (semi)',
    './tests/example-project-one/index.ts [1, 1]: Too many blank lines at the beginning of file. Max of 2 allowed. (no-multiple-empty-lines)',
    './tests/example-project-one/index.ts [4, 1]: Unexpected console statement. (no-console)',
    './tests/example-project-one/index.ts [4, 43]: Missing semicolon. (semi)',
  ]);

  setupProjectTest('two');
});
