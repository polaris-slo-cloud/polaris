import { Subscribable } from 'rxjs';

/**
 * A class or constructor function that creates an instance of `T`.
 */
export type Constructor<T> = new(...args: any[]) => T

/**
 * A factory function that takes as input an object of type `I` and returns an object of type `O`.
 */
export type FactoryFn<I, O> = (input: I) => O;

/**
 * A class or constructor function that creates an instance of `T` and initializes it
 * with the optional `initData`.
 */
export type PolarisConstructor<T> = new(initData?: Partial<T>) => T

/**
 * A class of type `T` that has the static properties defined in `P`.
 */
export type ConstructorWithStaticProperties<T, P> = (new(...args: any[]) => T) & P

export type ClassDecoratorFn = (target: Constructor<any>) => void;

/**
 * Used to describe an interface that has the same properties and methods as a class.
 */
export type InterfaceOf<T> = { [K in keyof T]: T[K]; };

/**
 * A function that returns a class/constructor.
 */
export type TypeFn<T> = () => Constructor<T>;

/**
 * Convenience type used for describing a key-value pair.
 */
export interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

/**
 * Convenience type to indicate that something may have an interface like an `Observable` or like a `Promise`.
 */
export type ObservableOrPromise<T> = Subscribable<T> | PromiseLike<T>;
