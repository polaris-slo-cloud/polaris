import { ElasticityStrategy, SloTarget } from '../../../model';

/**
 * This interface must be implemented by every controller that is responsible for an `ElasticityStrategy`.
 *
 * @note An `ElasticityStrategyController` is responsible for handling all instances of the `ElasticityStrategy`
 * it is responsible for.
 * This is unlike a `ServiceLevelObjective`, where each `SloMapping` is handled by a distinct instance of `ServiceLevelObjective`.
 *
 * @param O The type of output parameters from the SLO/input parameters of the elasticity strategy.
 * @param T (optional) The type of `SloTarget` that the elasticity strategy can operate on.
 * @param C (optional) The type of `staticConfig` that the elasticity strategy accepts.
 */
export interface ElasticityStrategyController<O, T extends SloTarget = SloTarget, C = Record<string, any>> {

    /**
     * Checks if an action is required for the specified `elasticityStrategy` instance.
     *
     * @param elasticityStrategy The `ElasticityStrategy` instance, which should be checked.
     * @returns A promise that resolves to `true`, if an action is needed for the specified `elasticityStrategy`,
     * and `false`, if not.
     */
    checkIfActionNeeded(elasticityStrategy: ElasticityStrategy<O, T, C>): Promise<boolean>;

    /**
     * Executes the elasticity strategy for the specified `elasticityStrategy` instance.
     *
     * @param elasticityStrategy The `ElasticityStrategy` instance that contains the configuration for
     * the actions to be executed.
     * @returns A promise that resolves when the execution of the elasticity strategy has completed.
     */
    execute(elasticityStrategy: ElasticityStrategy<O, T, C>): Promise<void>;

    /**
     * This method is called to notify this controller that the specified `elasticityStrategy` instance
     * has been deleted - this can be used to clear cached resources.
     *
     * The implementation of this method is optional.
     *
     * @param elasticityStrategy The `elasticityStrategy` instance that has been deleted.
     */
    onElasticityStrategyDeleted?(elasticityStrategy: ElasticityStrategy<O, T, C>): void;

    /**
     * This method is called when this controller is about to be destroyed.
     *
     * Its implementation is optional and it can be used to for cleanup.
     */
    onDestroy?(): void;

}
