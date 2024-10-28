/**
 * @version 1.0.0
 * @license MIT
 * @copyright CPC
 * @author Chris Legaxy | Chris Van
 * @contact chris.legaxy@gmail.com | chrisvan.vshmr@gmail.com
 */

/**
 * * Packages Imports
 */
import { Request } from 'express';
import { COOKIE_JWT_TOKEN_KEY_SERVICE } from './services/jwt-cookie.service';

/**
 * * Decoded Token Interface
 * @description - it will be dynamic based on the data that is being signed in jwt
 */
export interface DecodedToken {
  id: string;
  sub?: string;
  iat: number;
  exp: number;
  iss?: string;
}

/**
 * @function cookieExtractor
 * @description - custom cookie extractor
 * @param request
 * @returns refresh_token
 */
export const cookieExtractor = (request: Request): string =>
  //
  request?.signedCookies?.[COOKIE_JWT_TOKEN_KEY_SERVICE];
