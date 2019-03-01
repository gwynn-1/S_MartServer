/**
 * unauthorize.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.unauthorize();
 *     // -or-
 *     return res.unauthorize(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'unauthorize'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function unauthorize(message) {

  // Get access to `req` and `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 401;
  return res.status(statusCodeToSet).json({error_message:message});
};
