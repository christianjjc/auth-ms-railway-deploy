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
import { Response } from 'express';
import { COOKIE_JWT_TOKEN_KEY_SERVICE } from './services/jwt-cookie.service';

/**
 * @function setRefreshTokenToHttpOnlyCookie
 * @description - set refresh_token in response http-only cookie
 * @param response
 * @param token
 */
export const setRefreshTokenToHttpOnlyCookie = (response: Response, token: string) => {
  response.cookie(COOKIE_JWT_TOKEN_KEY_SERVICE, token, {
    httpOnly: true,
    /**
     * !! Important
     * * need to add absolute path
     */
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, //* --> 7 days
    sameSite: 'strict',
    signed: true,
    secure: true, // must set secure to false in development mode (API client can't access if secure is true)
  });
};

export const terminateRefreshTokenHttpOnlyCookie = (response: Response) => {
  response.clearCookie(COOKIE_JWT_TOKEN_KEY_SERVICE, {
    path: '/',
  });
};
