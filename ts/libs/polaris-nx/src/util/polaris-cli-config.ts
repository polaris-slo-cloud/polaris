
import * as path from 'path';
import { Tree, joinPathFragments, readJson, readProjectConfiguration, writeJson } from '@nrwl/devkit';
import { PolarisCliError } from './errors';
import {
    PolarisCliConfigData,
    PolarisCliProject,
    PolarisCliProjectType,
    PolarisControllerProject,
    PolarisControllerProjectType,
    PolarisLibraryProject,
} from './polaris-cli-config-data';
import { NormalizedLibraryClassGeneratorSchema, NormalizedProjectGeneratorSchema } from './schema';
import { getWorkspaceTsConfigPath } from './ts-config';

const POLARIS_CLI_CONFIG_FILE = './polaris.json';

/**
 * Provides access to and manages the Polaris CLI configuration file.
 */
export class PolarisCliConfig {

    /**
     * The config data of this project.
     *
     * While this can be modified directly, it is recommended to use the methods provided by this class.
     */
    data: PolarisCliConfigData;

    protected constructor(data: PolarisCliConfigData, protected host: Tree) {
        this.data = data;
    }

    /**
     * Reads the `PolarisCliConfig` from file or initializes an empty `PolarisCliConfig` object.
     */
    static readFromFile(host: Tree): PolarisCliConfig {
        let data: PolarisCliConfigData;

        if (host.exists(POLARIS_CLI_CONFIG_FILE)) {
            data = readJson(host, POLARIS_CLI_CONFIG_FILE);
        } else {
            data = {
                version: 1,
                projects: {},
            };
        }

        return new PolarisCliConfig(data, host);
    }

    /** Writes the current state of the config to the respective config file. */
    writeToFile(): void {
        writeJson(this.host, POLARIS_CLI_CONFIG_FILE, this.data);
    }

    /**
     * Adds a new project to the config.
     */
    addProject(name: string, config: PolarisCliProject): PolarisCliProject {
        if (this.data.projects[name]) {
            throw new PolarisCliError(`The project ${name} already exists.`);
        }
        this.data.projects[name] = config;
        return config;
    }

    /**
     * @returns The {@link PolarisCliProject} with the specified `name`.
     */
    getProject(name: string): PolarisCliProject {
        return this.data.projects[name];
    }

    /**
     * Gets the library project with the name `options.projectName` or creates it, if it does not exist.
     */
    getOrCreateLibraryProject(options: NormalizedLibraryClassGeneratorSchema): PolarisLibraryProject {
        let lib = this.getProject(options.projectName) as PolarisLibraryProject;

        if (lib) {
            if (lib.projectType !== PolarisCliProjectType.Library) {
                throw new PolarisCliError(`The project ${options.projectName} is not a library.`, lib);
            }
        } else {
            const projectConfig = readProjectConfiguration(this.host, options.projectName);
            const packageJson: { name: string } = readJson(this.host, joinPathFragments(projectConfig.root, 'package.json'));
            lib = {
                projectType: PolarisCliProjectType.Library,
                tsEntryPoint: joinPathFragmentsAndNormalize(projectConfig.sourceRoot, 'index.ts'),
                importPath: packageJson.name,
            };
            this.data.projects[options.projectName] = lib;
        }

        return lib;
    }

    /**
     * Registers the generated Polaris type for CRD generation and adds a library project,
     * if it does not exist yet.
     */
    registerPolarisTypeAsCrd(options: NormalizedLibraryClassGeneratorSchema): void {
        const lib = this.getOrCreateLibraryProject(options);
        const polarisType = options.className;

        if (!lib.crds) {
            const projectConfig = readProjectConfiguration(this.host, options.projectName);
            lib.crds = {
                tsConfig: joinPathFragmentsAndNormalize(getWorkspaceTsConfigPath(this.host)),
                outDir: joinPathFragmentsAndNormalize(projectConfig.sourceRoot, 'crds'),
                polarisTypes: [],
            };
        }

        if (!lib.crds.polarisTypes.find(item => item === polarisType)) {
            lib.crds.polarisTypes.push(polarisType);
        }
    }

    /**
     * Gets the controller project with the name `options.projectName` or creates it, if it does not exist.
     */
    getOrCreateControllerProject(options: NormalizedProjectGeneratorSchema, type: PolarisControllerProjectType): PolarisControllerProject {
        let controller = this.getProject(options.projectName) as PolarisControllerProject;

        if (controller) {
            if ((controller.projectType as any) === PolarisCliProjectType.Library) {
                throw new PolarisCliError(`The project ${options.projectName} is not a controller.`, controller);
            }
        } else {
            const projectConfig = readProjectConfiguration(this.host, options.projectName);
            controller = {
                projectType: type,
                tsEntryPoint: joinPathFragmentsAndNormalize(projectConfig.sourceRoot, 'main.ts'),
            };
            this.data.projects[options.projectName] = controller;
        }

        return controller;
    }

}

function joinPathFragmentsAndNormalize(...fragments: string[]): string {
    return path.posix.normalize(joinPathFragments(...fragments));
}
