import { lint, report, LintOptions } from '../../src/api';

export const testProject = (options: LintOptions, errors: string[] = []): void => {
  describe(`pattern "${options.pattern}"`, (): void => {
    let logger: jest.Mock<Console['log']>;

    beforeEach((done): void => {
      // eslint-disable-next-line no-console
      logger = console.log as jest.Mock<Console['log']>;
      lint(options).then((result): void => {
        report(result);
        done();
      });
    });

    it(`should ${errors.length ? 'fail' : 'pass'}`, (): void => {
      expect(logger.mock.calls).toHaveLength(errors.length);
    });

    errors.forEach((error, index): void => {
      it(`should have failure number ${index + 1} be "${error}"`, (): void => {
        expect(logger.mock.calls[index].join(' ')).toBe(error);
      });
    });
  });
};
