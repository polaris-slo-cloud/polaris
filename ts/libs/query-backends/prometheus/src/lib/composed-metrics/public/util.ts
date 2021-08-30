import { ComposedMetricType } from '@polaris-sloc/core';
import { snakeCase } from 'lodash';

/** Constants used for naming Polaris composed metrics in Prometheus. */
export const PROM_COMPOSED_METRIC_LABELS = Object.freeze({

    /** The prefix used for all Polaris composed metric names in Prometheus. */
    metricPrefix: 'polaris_composed',

    /** The name of the label that stores the GroupVersionKind string. */
    gvkLabel: 'gvk',

    /** The name of the label that stores the namespace of the `SloTarget`. */
    namespaceLabel: 'namespace',

    /** The name of the label that stores the name of the `SloTarget`. */
    targetNameLabel: 'target_name',

});

/**
 * Gets the Prometheus name of the composed metric without the `polaris_composed` prefix.
 * The prefix `PROM_COMPOSED_METRIC_LABELS.metricPrefix` should be used as `appName` when creating
 * a `TimeSeriesQuery`.
 */
export function getPrometheusMetricNameWithoutPrefix(metricType: ComposedMetricType<any>): string {
    return snakeCase(metricType.metricTypeName);
}