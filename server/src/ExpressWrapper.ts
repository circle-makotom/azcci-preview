import * as express from 'express';
import { SerialNumber } from './services/SerialNumber';

import { SerialNumberResponder } from './responders/SerialNumberResponder';

import type * as http from 'http';

declare const __BUILD_VERSION: string;

class ExpressWrapper {
    private readonly listenAddrs = ['::'];
    private readonly listenPort = 58888;

    public services = {
        SerialNumber: new SerialNumber()
    };

    public responders = {
        SerialNumber: new SerialNumberResponder()
    };

    private app: express.Express = express();
    private httpServers: http.Server[] = [];

    constructor() {
        this.app.use((req, res, next) =>
            this.setVersionInHeader(req, res, next)
        );

        this.armEndpoints();
    }

    public startListening(): Promise<ExpressWrapper['httpServers']> {
        return new Promise(this.startListeningPromiseWorker.bind(this));
    }

    private async startListeningPromiseWorker(
        masterResolve: (w: ExpressWrapper['httpServers']) => void,
        masterReject: (e: Error) => void
    ) {
        try {
            const promises = this.listenAddrs.map((listenAddr) => {
                return new Promise<http.Server | Error>((resolve, reject) => {
                    try {
                        let server: http.Server = null;

                        server = this.app.listen(
                            this.listenPort,
                            listenAddr,
                            () => {
                                console.log(
                                    `Listening ${this.listenPort} of ${listenAddr}`
                                );
                                resolve(server);
                            }
                        );
                        this.httpServers.push(server);
                    } catch (err) {
                        reject(err);
                    }
                }).catch((err) => console.error(err));
            });

            for (const promise of promises) {
                await promise;
            }

            masterResolve(this.httpServers);
        } catch (err) {
            masterReject(err);
        }
    }

    private setVersionInHeader(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        res.setHeader(
            'X-App-Version',
            typeof __BUILD_VERSION === typeof '' ? __BUILD_VERSION : 'local'
        );
        next();
    }

    private armEndpoints() {
        this.app.get('/serial', (req, res) =>
            this.responders.SerialNumber.getSerialNumber(
                this.services,
                req,
                res
            )
        );

        this.app.get('/users', (req, res) =>
            this.responders.SerialNumber.getUsers(this.services, req, res)
        );
    }
}

export { ExpressWrapper };
