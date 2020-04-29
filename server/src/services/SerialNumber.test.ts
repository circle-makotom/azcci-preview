import { SerialNumber } from './SerialNumber';

describe('SerialNumber', () => {
    test('Default initial value', () => {
        const expectedNumber = 0;
        const serialNumber = new SerialNumber();

        expect(serialNumber.getNewSerialNumber()).toBe(expectedNumber);
        expect(serialNumber.getNewSerialNumber()).toBe(expectedNumber + 1);
    });

    test('Custom initial value', () => {
        const expectedNumber = 10;
        const serialNumber = new SerialNumber(expectedNumber);

        expect(serialNumber.getNewSerialNumber()).toBe(expectedNumber);
        expect(serialNumber.getNewSerialNumber()).toBe(expectedNumber + 1);
    });
});
