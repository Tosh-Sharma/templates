import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

/**
 * Handles the access token validation.
 */

 export async function expressAuthentication(
     request: express.Request,
     securityName: string,
     scopes?: string[]
 ): Promise<any> {
    let token: string = '';
    if(request.headers.authorization) {
        token = request.headers.authorization;
    }
    
    const match = token.match(/^Bearer (.*)$/i);
    if(!match || match.length < 2) {
        return Promise.reject({
            message: `Invalid Authoization - token ${token} does not match 'Bearer .*' or 'bearer .*'`
        });
    }

    const accessToken = match[1];
    const decoded: any = jwt.decode(accessToken, { complete: true});

    const signingKey: string = await getKey(decoded.header.kid);

    jwt.verify(accessToken, signingKey, {
        audience: process.env.AUDIENCE,
        issuer: process.env.ISSUER
    });
}

function getKey(kid: string): Promise<string> {
    const client = jwksClient.default({
        cache: true,
        jwksRequestsPerMinute: 10,
        jwksUri: process.env.JWKSURI,
        rateLimit: true
    });
    return new Promise((resolve, reject) => {
        client.getSigningKey(kid, (err, key) => {
            if(err) {
                reject(err);
            } else {
                const signingKey: string = key.publicKey || key.rsaPublicKey;
                resolve(signingKey);
            }
        });
    });
}