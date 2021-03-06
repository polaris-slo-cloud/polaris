import { Constructor } from '../../../util';
import { ObjectKind } from './object-kind.prm';

export class PolarisTransformationError extends Error {}

/**
 * This type of error is thrown when there is a problem when transforming a Polaris object
 * into an orchestrator-specific plain object.
 */
export class PolarisToOrchestratorTransformationError extends PolarisTransformationError {

    constructor(public polarisObj: any, message: string) {
        super(message);
    }

}

/**
 * This type of error is thrown when there is a problem when transforming an orchestrator-specific plain object
 * into a Polaris object.
 */
export class OrchestratorToPolarisTransformationError extends PolarisTransformationError {

    constructor(
        public polarisType: Constructor<any>,
        public orchPlainObj: any,
        message: string,
    ) {
        super(message);
    }

}

/**
 * This type of error is thrown when trying to derive the Polaris type that corresponds to the `ObjectKind`
 * specified in the orchestrator-specific plain object.
 */
export class UnknownObjectKindError extends PolarisTransformationError {

    constructor(
        public kind: ObjectKind,
        public orchPlainObj: any,
        message: string,
    ) {
        super(message);
    }

}
