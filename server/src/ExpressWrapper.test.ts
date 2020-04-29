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

    test('expApp.use and expApp.get is called at least once', () => {
        expect(mockExpApp.use).toHaveBeenCalled();
        expect(mockExpApp.get).toHaveBeenCalled();
    });

    test('expApp.listen is called after calling startListening', async () => {
        expect(mockExpApp.listen).not.toHaveBeenCalled();
        await wrapper.startListening();
        expect(mockExpApp.listen).toHaveBeenCalled();
    });
});
