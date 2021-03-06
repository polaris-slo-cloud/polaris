import * as http from 'http';
import { ObjectKind } from '../../model';
import { ObjectKindWatcher } from './object-kind-watcher';
import { WatchManager } from './watch-manager';

/**
 * A set of commonly occurring error codes (not exhaustive).
 */
// eslint-disable-next-line no-shadow
export enum CommonOrchestratorErrorCodes {

    /** The request was invalid. */
    BadRequest = 400,

    /** The client has not authenticated (logged in) to the orchestrator. */
    Unauthorized = 401,

    /** The authenticated account does not have permission to perform the requested operation.  */
    Forbidden = 403,

    /**
     * The specified object was not found.
     *
     * This can mean that either the `ObjectKind` or the specific object does not exist.
     */
    NotFound = 404,

    /** The request has timed out. */
    RequestTimeout = 408,

    /**
     * Writing the object failed, because of a conflict.
     *
     * When creating a new object, this usually means that the object already exists.
     * When updating an object, this usually means that the object has been updated since it was last read.
     */
    Conflict = 409,

    /** An internal server error that has not been further specified has occurred. */
    InternalServerError = 500,

    /** The orchestrator is not able to handle the request. */
    ServiceUnavailable = 503,

}

/**
 * Describes an error that occurred while executing a request to the orchestrator.
 */
export class OrchestratorRequestError extends Error {

    /**
     * The HTTP status code returned by the request or `0` if the error
     * occurred in the local process.
     *
     * If the orchestrator does not use HTTP status codes, the respective orchestrator connector
     * library converts the orchestrator-specific error codes into HTTP status codes.
     */
    readonly statusCode: number;

    /**
     * The message corresponding to the `statusCode`.
     *
     * This property is set automatically according to the `statusCode`.
     *
     * For a descriptive error message, check the `message` property.
     */
    readonly statusMessage: string;

    /**
     * The internal error that caused this `OrchestratorRequestError`.
     *
     * This can be an error object from the orchestrator's native client library.
     */
    readonly reason?: Error;

    /**
     * Creates a new `OrchestratorRequestError`.
     *
     * @param statusCode The HTTP status code from the orchestrator's response.
     * @param reason (optional) The internal error that caused this `OrchestratorRequestError`.
     */
    constructor(statusCode: number, reason?: Error);
    /**
     * Creates a new `OrchestratorRequestError`.
     *
     * @param statusCode The HTTP status code from the orchestrator's response.
     * @param message (optional) A descriptive error message.
     * @param reason (optional) The internal error that caused this `OrchestratorRequestError`.
     */
    constructor(statusCode: number, message?: string, reason?: Error);
    constructor(statusCode: number, messageOrReason?: string | Error, reason?: Error) {
        super(typeof messageOrReason === 'string' ? messageOrReason : http.STATUS_CODES[statusCode]);
        this.statusCode = statusCode;
        this.statusMessage = http.STATUS_CODES[statusCode];
        this.reason = reason;
    }

}

/**
 * Error that is thrown by the `ObjectKindWatcher` implementations.
 */
 export class ObjectKindWatcherError extends Error {

    constructor(public watcher: ObjectKindWatcher, message?: string) {
        super(message);
    }

}

/**
 * Error that is thrown if required parts of `ObjectKind` when starting a watch.
 */
export class ObjectKindPropertiesMissingError extends ObjectKindWatcherError {

    constructor(
        public watcher: ObjectKindWatcher,
        public kind: ObjectKind,
        missingProperties: (keyof ObjectKind)[],
    ){
        super(watcher, `The following required properties are missing from the specified ObjectKind: ${missingProperties.join()}`);
    }

}

/**
 * Error that is thrown if an `ObjectKind` is not found by the orchestrator.
 */
export class ObjectKindNotFoundError extends ObjectKindWatcherError {

    constructor(
        public watcher: ObjectKindWatcher,
        public kind: ObjectKind,
    ){
        super(watcher, 'ObjectKind not found');
    }

}

/**
 * Error that is thrown if `ObjectKindWatcher.startWatch()` is called while the watch is already active.
 */
export class WatchAlreadyStartedError extends ObjectKindWatcherError {

    constructor(public watcher: ObjectKindWatcher) {
        super(watcher, 'Cannot start a watch, because this watcher has already been started.');
    }

}

/**
 * Error that is thrown if `WatchManager.startWatchers()` is called with one or more `ObjectKinds`, for which a watch has already been started.
 */
export class ObjectKindsAlreadyWatchedError extends Error {

    constructor(public watchManager: WatchManager, public watchedKinds: ObjectKind[]) {
        super(`The following ObjectKinds are already being watched by this WatchManager: ${watchedKinds.map(kind => ObjectKind.stringify(kind)).join(',\n')}`)
    }

}

/**
 * Error that is passed to `WatchEventsHandler.onError()` if there watch has terminated unexpectedly.
 */
export class WatchTerminatedError extends ObjectKindWatcherError {

    constructor(public watcher: ObjectKindWatcher, public cause?: any) {
        super(watcher, 'The watch has terminated unexpectedly.');
    }

}


export class MicrocontrollerFactoryNotRegisteredError extends Error {

    constructor(public spec: any) {
        super('No `FactoryFn` was registered for the spec.');
    }

}
