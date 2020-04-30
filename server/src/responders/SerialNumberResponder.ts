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
        const user = this.generalizeUser(req.query.user);

        res.setHeader('Content-Type', 'application/json');
        res.json(
            this.genMessageWithSerialNumber(
                services.SerialNumber.getNewSerialNumber(user),
                user
            )
        );
    }

    public getUsers(
        services: ExpressWrapper['services'],
        req: express.Request,
        res: express.Response
    ) {
        res.setHeader('Content-Type', 'application/json');
        res.json(services.SerialNumber.users);
    }

    private genMessageWithSerialNumber(serial: number, user?: string) {
        return {
            serial: serial,
            message: `Hello ${user}!`
        };
    }

    private generalizeUser(userRaw: QueryValue): string {
        return typeof userRaw === typeof '' && userRaw
            ? (userRaw as string)
            : 'anonymous';
    }
}

export { SerialNumberResponder };
