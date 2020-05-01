import { ExpressWrapper } from './ExpressWrapper';

const mockExpApp = {
    use: jest.fn(),
    get: jest.fn(),
    listen: jest.fn((port, addr, cb) => cb())
};

jest.mock('express', () => {
    return jest.fn().mockImplementation(() => {
        return mockExpApp;
    });
});

describe('Constructor', () => {
    const wrapper = new ExpressWrapper();

    test('expApp.use is called at least once', () => {
        expect(mockExpApp.use).toHaveBeenCalled();
    });

    test('expApp.listen is called only after calling startListening', async () => {
        expect(mockExpApp.listen).not.toHaveBeenCalled();
        await wrapper.startListening();
        expect(mockExpApp.listen).toHaveBeenCalled();
    });
});

describe('armEndpoint', () => {
    const wrapper = new ExpressWrapper();

    test('get', () => {
        mockExpApp.get.mockClear();
        wrapper.armEndpoint('GET', '/', () => void 0);
        expect(mockExpApp.get).toHaveBeenCalled();
    });
});
