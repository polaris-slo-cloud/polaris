/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { checkFilesExist, ensureNxProject, runNxCommandAsync, uniq } from '@nrwl/nx-plugin/testing';
import { WORKSPACE_NPM_PACKAGE } from './util';


describe('elasticity-strategy-controller e2e', () => {

    beforeAll(() => {
        jest.setTimeout(120000);
    });

    afterAll(() => {
        jest.setTimeout(5000);
    });

    it('should create an elasticity-strategy-controller', async done => {
        const controllerName = uniq('elasticity-strategy-controller-test');
        const eStratType = 'HorizontalElasticityStrategy';
        const eStratTypePkg = '@polaris-sloc/common-mappings';

        ensureNxProject(WORKSPACE_NPM_PACKAGE, 'dist/libs/polaris-nx');

        const result = await runNxCommandAsync(
            `g @polaris-sloc/polaris-nx:elasticity-strategy-controller ${controllerName} --eStratTypePkg=${eStratTypePkg} --eStratType=${eStratType}`,
        );
        if (result.stderr) {
            console.log(result.stderr);
        }
        expect(() => checkFilesExist(
            `apps/${controllerName}/src/app/elasticity/horizontal-elasticity-strategy-controller.ts`,
            `apps/${controllerName}/src/app/elasticity/index.ts`,
            `apps/${controllerName}/src/main.ts`,
            `apps/${controllerName}/Dockerfile`,
            '.dockerignore',
        )).not.toThrow();

        done();
    });

});
