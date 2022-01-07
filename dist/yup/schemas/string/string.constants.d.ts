/** Regex to test for international email regex. source: https://awik.io/international-email-address-validation-javascript/ */
export declare const INTERNATIONAL_EMAIL_REGEX: RegExp;
/**
 * RegExp to test a string for a ISO 8601 Date spec
 *  YYYY-MM-DDThh:mmTZD
 *  YYYY-MM-DDThh:mm:ssTZD
 *  YYYY-MM-DDThh:mm:ss.sTZD
 */
export declare const ISO_8601_DATE_TIME_REGEX: RegExp;
/**
 * RegExp to test a string for a ISO 8601 Time spec
 *  hh:mmTZD
 *  hh:mm:ssTZD
 *  hh:mm:ss.sTZD
 */
export declare const ISO_8601_TIME_REGEX: RegExp;
/**
 * Date Regex for the following format
 *  YYYY-MM-DD
 */
export declare const DATE_REGEX: RegExp;
/**
 * Hostname Regex. source: https://www.regextester.com/23
 * Validates all host names including international hostname.
 */
export declare const HOSTNAME_REGEX: RegExp;
/**
 * International hostname Regex. source: https://regexr.com/3abjr
 * Validates:
 * xn-fsqu00a.xn-0zwm56d
 * xn--stackoverflow.com
 */
export declare const INTERNATIONAL_HOSTNAME_REGEX: RegExp;
/**
 * IPV4 Regex. source: https://www.oreilly.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
 * Validates:
 * 8.8.8.8
 * 192.14.23.4
 * 1.0.0.255
 */
export declare const IPV4_REGEX: RegExp;
/**
 * IPV6 Regex. source: https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s17.html
 * Validates:
 * 1762:0:0:0:0:B03:1:AF18
 * 21DA:D3:0:2F3B:2AA:FF:FE28:9C5A
 * FE80:0000:0000:0000:0202:B3FF:FE1E:8329
 */
export declare const IPV6_REGEX: RegExp;
