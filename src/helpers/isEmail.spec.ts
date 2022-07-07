import { isEmail } from './isEmail';

describe('Name of the group', () => {
    test('should ', () => {
        expect(isEmail('')).toBeFalsy();
    });
    test('should ', () => {
        expect(isEmail('algo@algo.com')).toBeTruthy();
    });
});
