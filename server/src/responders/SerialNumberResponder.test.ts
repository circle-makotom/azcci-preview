import { SerialNumberResponder } from './SerialNumberResponder';

import type * as express from 'express';
import type { ExpressWrapper } from '../ExpressWrapper';

const mockServices = () => {
    return {
        SerialNumber: {
            getNewSerialNumber: () => 0
        }
    };
};

const mockReq = (user: string) => {
    return {
        query: {
            user
        }
    };
};

const mockRes = () => {
    return {
        setHeader: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    };
};

describe('getSerialNumber', () => {
    const serialNumberResponder = new SerialNumberResponder();

    const services = mockServices();
    const req = mockReq('test-user');
    const res = mockRes();

    serialNumberResponder.getSerialNumber(
        (<unknown>services) as ExpressWrapper['services'],
        (<unknown>req) as express.Request,
        (<unknown>res) as express.Response
    );

    test('header', () => {
        expect(res.setHeader.mock.calls[0][0]).toBe('Content-Type');
        expect(res.setHeader.mock.calls[0][1]).toBe('application/json');
    });

    test('body', () => {
        expect(res.json.mock.calls[0][0]).toStrictEqual({
            serial: 0,
            message: 'Hello test-user!'
        });
    });
});

describe('genMessageWithSerialNumber', () => {
    test('Serial number', () => {
        // Expected value
        const expectedNumber = 0;

        // Actual instance
        const serialNumberResponder = new SerialNumberResponder();
        // @ts-ignore
        const msg = serialNumberResponder.genMessageWithSerialNumber(
            expectedNumber
        );

        expect(msg.serial).toBe(0);
    });

    test('Message (named user)', () => {
        // Expected value
        const testedUser = 'test-user';
        const expectedMessage = 'Hello test-user!';

        // Actual instance
        const serialNumberResponder = new SerialNumberResponder();
        // @ts-ignore
        const msg = serialNumberResponder.genMessageWithSerialNumber(
            0,
            testedUser
        );

        expect(msg.message).toBe(expectedMessage);
    });

    test('Message (empty user)', () => {
        // Expected value
        const testedUser = '';
        const expectedMessage = 'Hello anonymous!';

        // Actual instance
        const serialNumberResponder = new SerialNumberResponder();
        // @ts-ignore
        const msg = serialNumberResponder.genMessageWithSerialNumber(
            0,
            testedUser
        );

        expect(msg.message).toBe(expectedMessage);
    });

    test('Message (non-string user)', () => {
        // Expected value
        const testedUser = ['foo', 'bar'];
        const expectedMessage = 'Hello anonymous!';

        // Actual instance
        const serialNumberResponder = new SerialNumberResponder();
        // @ts-ignore
        const msg = serialNumberResponder.genMessageWithSerialNumber(
            0,
            testedUser
        );

        expect(msg.message).toBe(expectedMessage);
    });
});