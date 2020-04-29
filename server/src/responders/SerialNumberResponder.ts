import type * as express from 'express';
import type { Query } from 'express-serve-static-core';

import type { ExpressWrapper } from '../ExpressWrapper';

type QueryValue = string | Query | (string | Query)[];

class SerialNumberResponder {
    public getSerialNumber(
        services: ExpressWrapper['services'],
        req: express.Request,
        res: express.Response
    ) {
        res.setHeader('Content-Type', 'application/json');
        res.json(
            this.genMessageWithSerialNumber(
                services.SerialNumber.getNewSerialNumber(),
                req.query.user
            )
        );
    }

    private genMessageWithSerialNumber(serial: number, user?: QueryValue) {
        return {
            serial: serial,
            message: `Hello ${
                typeof user === typeof '' && user ? user : 'anonymous'
            }!`
        };
    }
}

export { SerialNumberResponder };
