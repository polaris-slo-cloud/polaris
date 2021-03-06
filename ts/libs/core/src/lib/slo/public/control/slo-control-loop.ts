import { Observable } from 'rxjs';
import { SloMapping, SloMappingSpec } from '../../../model';
import { MicrocontrollerFactory, WatchEventsHandler } from '../../../orchestrator';
import { ServiceLevelObjective } from '../common';
import { SloEvaluator } from './slo-evaluator';

/** The default timeout period for SLO evaluations. */
export const SLO_DEFAULT_TIMEOUT_MS = 20 * 1000;

/**
 * Configuration needed for starting an `SloControlLoop`.
 */
export interface SloControlLoopConfig {

    /**
     * This observable defines the interval of the control loop.
     * Whenever it emits, a loop iteration is executed.
     *
     * The emitted value is not used.
     */
    interval$: Observable<any>;

    /**
     * This is used to actually evaluate an SLO during an iteration
     * and apply its output to the orchestrator.
     *
     * It should be used to implement orchestrator-specific handling of the output.
     */
    evaluator: SloEvaluator;

    /**
     * The number of milliseconds after which an SLO evaluation should time out.
     *
     * If this is not specified, `SLO_DEFAULT_TIMEOUT_MS` is used.
     */
    sloTimeoutMs?: number;

}

/**
 * Used to connect an `ObjectKindWatcher` to an `SloControlLoop`.
 */
export interface SloWatchEventsHandler extends WatchEventsHandler<SloMapping<any, any>> {}

/**
 * This interface must be implemented by classes that run an SLO control loop.
 */
export interface SloControlLoop {

    /**
     * `true` when the control loop is running, otherwise `false`.
     */
    readonly isActive: boolean;

    /**
     * The `WatchEventsHandler` that can be used to connect this control loop to an `ObjectKindWatcher`.
     *
     * @note This property is only set if the control loop is currently active.
     */
    readonly watchHandler: SloWatchEventsHandler;

    /**
     * This factory is used to instantiate a new `ServiceLevelObjective` when an SLO mapping is received.
     * Before starting the control loop, factories for all watched SLO mapping kinds must be registered.
     *
     * @important The factory should only instantiate a `ServiceLevelObjective`.
     * The factory MUST NOT call the `ServiceLevelObjective.configure()` method.
     */
    readonly microcontrollerFactory: MicrocontrollerFactory<SloMappingSpec<any, any, any>, ServiceLevelObjective<any, any, any>>;

    /**
     * Creates a new SLO instance using the specified `sloMapping` and adds that instance
     * under the `key`, such that it will be evaluated on every loop iteration,
     * starting with the next one.
     *
     * If an SLO with the same `key` already exists, it will be replaced.
     *
     * @param key The key that should be used to identify the SLO.
     * This must be unique within the cluster.
     * @param sloMapping The `SloMapping` that describes the SLO.
     * @returns A Promise that resolves to the created `ServiceLevelObjective` object or rejects
     * if an error occurs.
     */
    addSlo(key: string, sloMapping: SloMapping<any, any, any>): Promise<ServiceLevelObjective<any, any, any>>;

    /**
     * @returns The `ServiceLevelObjective` that has been added under the specified `key`
     * or `undefined` if no SLO exists for that key.
     */
    getSlo(key: string): ServiceLevelObjective<any, any>;

    /**
     * Removes the `ServiceLevelObjective` that has been added under the specified `key`
     * from future iterations of the control loop.
     */
    removeSlo(key: string): boolean;

    /**
     * @returns A map of all SLOs that are currently part of this control loop.
     */
    getAllSlos(): Record<string, ServiceLevelObjective<any, any>>;

    /**
     * Starts the control loop.
     *
     * @param config The `SloControlLoopConfig` used to configure the control loop.
     */
    start(config: SloControlLoopConfig): void;

    /**
     * Stops the control loop.
     */
    stop(): void;

}
