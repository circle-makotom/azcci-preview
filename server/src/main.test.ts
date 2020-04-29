import { mainPromise } from './main';

import * as http from 'http';

const promiseGet = (url: string, options = {}) => {
    return new Promise(
        (
            resolve: (v: {
                httpRes: http.IncomingMessage;
                data: Buffer;
            }) => void
        ) => {
            http.get(url, options, (res) => {
                const chunks: Buffer[] = [];

                res.on('data', (data) => {
                    chunks.push(data);
                });

                res.on('end', () => {
                    resolve({
                        httpRes: res,
                        data: Buffer.concat(chunks)
                    });
                });
            });
        }
    );
};

beforeAll(async () => {
    await mainPromise;
});

test('GET /', async () => {
    const { httpRes, data } = await promiseGet('http://localhost:58888/');

    expect(httpRes.headers['x-app-version']).toBe('local');
    expect(JSON.parse(data.toString())).toStrictEqual({
        serial: 0,
        message: 'Hello anonymous!'
    });
});

afterAll(async () => {
    (await mainPromise).forEach((server) => {
        server.close();
    });
});
