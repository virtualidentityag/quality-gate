import { lint, report, LintOptions } from '../../src/api';

export const testProject = (options: LintOptions, errors: string[] = []): void => {
  describe(`pattern "${options.pattern}"`, () => {
    let logger: jest.Mock<Console['log']>;

    beforeEach((done) => {
      // eslint-disable-next-line no-console
      logger = console.log as jest.Mock<Console['log']>;
      lint(options).then((result) => {
        report(result);
        done();
      });
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
