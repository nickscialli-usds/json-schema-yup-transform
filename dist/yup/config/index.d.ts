import { ConfigErrors, Config } from "../types";
/** Store configuration options */
export declare const setConfiguration: (options: Config) => void;
/** Retrieve configuration options */
export declare const getConfiguration: () => Config;
/** Retrieve all errors from configuration */
export declare const getErrors: () => ConfigErrors | undefined;
/** Retrieve specific error from configuration */
export declare const getError: (path: string | false) => string | false;
