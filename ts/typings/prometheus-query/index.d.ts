// These typings were generated by the SLOC team from the source code of https://github.com/samber/prometheus-query-js v2.1.4
// `npx typescript ./src/index.js --declaration --allowJs --emitDeclarationOnly --outDir types`
// We have combined the output in a single file and made some changes to the generated typings to make them more complete.
declare module 'prometheus-query' {
    export class ResponseType {
        static get MATRIX(): string;
        static get VECTOR(): string;
        static get SCALAR(): string;
        static get STRING(): string;
    }
    export class Metric {
        static fromJSON(obj: any): Metric;
        constructor(name: any, labels: any);
        name: string;
        labels: { [label: string]: string };
        toString(): string;
    }
    export class SampleValue {
        static fromJSON(arr: any): SampleValue;
        constructor(unixTime: any, sampleValue: any);
        time: Date;
        value: number;
        toString(): string;
    }
    export class RangeVector {
        static fromJSON(obj: any): RangeVector;
        constructor(metric: any, values: any);
        metric: Metric;
        values: SampleValue[];
    }
    export class InstantVector {
        static fromJSON(obj: any): InstantVector;
        constructor(metric: any, value: any);
        metric: Metric;
        value: SampleValue;
    }
    export class QueryResult<T> {
        static fromJSON<T>(data: any): QueryResult<T>;
        constructor(resultType: any, result: any);
        resultType: any;
        result: T[];
    }
    export class Target {
        static fromJSON(obj: any): Target;
        constructor(discoveredLabels: any, labels: any, scrapePool: any, scrapeUrl: any, lastError: any, lastScrape: any, lastScrapeDuration: any, health: any);
        discoveredLabels: any;
        labels: any;
        scrapePool: any;
        scrapeUrl: any;
        lastError: any;
        lastScrape: any;
        lastScrapeDuration: any;
        health: any;
    }
    export class Alert {
        static fromJSON(obj: any): Alert;
        constructor(activeAt: any, annotations: any, labels: any, state: any, value: any);
        activeAt: any;
        annotations: any;
        labels: any;
        state: any;
        value: any;
    }
    export class Rule {
        static fromJSON(obj: any): Rule;
        constructor(alerts: any, annotations: any, duration: any, health: any, labels: any, name: any, query: any, type: any);
        alerts: any;
        annotations: any;
        duration: any;
        health: any;
        labels: any;
        name: any;
        query: any;
        type: any;
    }
    export class RuleGroup {
        static fromJSON(obj: any): RuleGroup;
        constructor(rules: any, file: any, interval: any, name: any);
        rules: any;
        file: any;
        interval: any;
        name: any;
    }

    export default class PrometheusQuery {
        /**
         * Creates a PrometheusQuery client
         * `options` has the following fields:
         *      - endpoint: address of Prometheus instance
         *      - baseURL: base path of Prometheus API (default: /api/v1)
         *      - headers: headers to be sent (k/v format)
         *      - auth: {username: 'foo', password: 'bar'}: basic auth
         *      - proxy: {host: '127.0.0.1', port: 9000}: hostname and port of a proxy server
         *      - withCredentials: indicates whether or not cross-site Access-Control requests
         *      - timeout: number of milliseconds before the request times out
         *      - warningHook: a hook for handling warning messages
         * @param {*} options
         */
        constructor(options: any);
        endpoint: any;
        baseURL: any;
        headers: any;
        auth: any;
        proxy: any;
        withCredentials: any;
        timeout: any;
        warningHook: any;
        request(method: any, uri: any, params: any, body: any): Promise<any>;
        handleResponse(response: any): any;
        formatTimeToPrometheus(input: any, dEfault: any): number;
        /***********************  EXPRESSION QUERIES  ***********************/
        /**
         * Evaluates an instant query at a single point in time
         * @param {*} query Prometheus expression query string.
         * @param {*} time Evaluation Date object or number in milliseconds. Optional.
         */
        instantQuery(query: string, time?: Date | number): Promise<QueryResult<InstantVector>>;
        /**
         * Evaluates an expression query over a range of time
         * @param {*} query Prometheus expression query string.
         * @param {*} start Start Date object or number in milliseconds.
         * @param {*} end End Date object or number in milliseconds.
         * @param {*} step Query resolution step width in number of seconds.
         */
        rangeQuery(query: string, start: Date | number, end: Date | number, step?: number): Promise<QueryResult<RangeVector>>;
        /***********************  METADATA API  ***********************/
        /**
         * Finding series by label matchers
         * @param {*} matchs Repeated series selector argument that selects the series to return.
         * @param {*} start Start Date object or number in milliseconds.
         * @param {*} end End Date object or number in milliseconds.
         */
        series(matchs: any, start: any, end: any): Promise<any>;
        /**
         * Getting label names
         */
        labelNames(): Promise<any>;
        /**
         * Querying label values
         * @param {*} labelName This argument is not explicit ?
         */
        labelValues(labelName: any): Promise<any>;
        /**
         * Overview of the current state of the Prometheus target discovery:
         * @param {*} state Filter by target state. Can be 'active', 'dropped' or 'any'. Optional.
         */
        targets(state: any): Promise<{
            activeTargets: any;
            droppedTargets: any;
        }>;
        /**
         * Returns metadata about metrics currently scraped from targets.
         * @param {*} matchTarget Label selectors that match targets by their label sets. Optional.
         * @param {*} metric Metric name to retrieve metadata for. Optional.
         * @param {*} limit Maximum number of targets to match. Optional.
         */
        targetsMetadata(matchTarget: any, metric: any, limit: any): Promise<any>;
        /**
         * Metadata about metrics currently scrapped from targets
         * @param {*} metric Metric name to retrieve metadata for. Optional.
         * @param {*} limit Maximum number of targets to match. Optional.
         */
        metadata(metric: any, limit: any): Promise<any>;
        /***********************  SERIES API  ***********************/
        /**
         * Getting a list of alerting and recording rules
         */
        rules(): Promise<any>;
        /**
         * Returns a list of all active alerts.
         */
        alerts(): Promise<any>;
        /**
         * Returns an overview of the current state of the Prometheus alertmanager discovery.
         */
        alertmanagers(): Promise<any>;
        /***********************  STATUS API  ***********************/
        /**
         * Following status endpoints expose current Prometheus configuration.
         */
        status(): Promise<any>;
        /**
         * Returns flag values that Prometheus was configured with.
         * New in v2.2
         */
        statusFlags(): Promise<any>;
        /**
         * Returns runtime information properties that Prometheus was configured with.
         * New in v2.14
         */
        statusRuntimeInfo(): Promise<any>;
        /**
         * Returns various build information properties about Prometheus Server.
         */
        statusBuildinfo(): Promise<any>;
        /**
         * Returns various cardinality statistics about the Prometheus TSDB.
         * New in v2.14
         */
        statusTSDB(): Promise<any>;
        /***********************  ADMIN API  ***********************/
        /**
         * Creates a snapshot of all current data
         * New in v2.1
         * @param {*} skipHead Skip data present in the head block. Boolean. Optional.
         */
        adminSnapshot(skipHead: any): Promise<any>;
        /**
         * Deletes data for a selection of series in a time range
         * New in v2.1
         * @param {*} matchs Repeated series selector argument that selects the series to return.
         * @param {*} start Start Date object or number in milliseconds.
         * @param {*} end End Date object or number in milliseconds.
         */
        adminDeleteSeries(matchs: any, start: any, end: any): Promise<any>;
        /**
         * Removes the deleted data from disk and cleans up
         * New in v2.1
         */
        adminCleanTombstones(): Promise<any>;
    }
}
