//
// Load environment variables in.
//
// IMPORTANT:
//
//   1.  These might be null, so fallback to sane defaults accordingly where you
//       make use of these.
//
//   2.  You must use this syntax: process.env.NAME_OF_ENV_VAR.  No funny stuff
//       or the babel plugin won't work.
//
//   3.  You must whitelist each one in your `.babelrc` file.
//
// GOTCHA:
//
//   Babel will cache things extensively. In dev, to bust this cache to pick up
//   new environment variable values, just change this file and resave it.
//
//   Or run `yarn start --reset-cache` to nuke babel's cache entirely
//   (overkill).
//
// ----------------------------------------------------------------------------

// tell typescript that there will be a the `node.js` process global variable used
declare var process: any

/**
 * An example importing an environment variable.
 */
export const API: string | undefined = process.env.API
export const API_ID: string = process.env.API_ID || "3"
export const URL: string = process.env.API_URL || "http://e97f34b8.ngrok.io"
export const NUTRITION_API_KEY: string = process.env.USERNAME || "xChdYNeHoRKgy67FhV67BlFUo2A2lJi6Xhj3HLI5"