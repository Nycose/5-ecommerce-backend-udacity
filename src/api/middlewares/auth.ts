/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyAuthToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const decoded = jwt.verify(
                token,
                process.env.TOKEN_SECRET as string
            );

            next();
        } else {
            throw new Error('Authorization header does not exist');
        }
    } catch (error) {
        res.status(401).send('Unable to confirm authorization');
    }
};
