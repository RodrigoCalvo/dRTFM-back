import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { iUser } from '../user/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { AdminMiddleware } from './admin.middleware';

describe('Given AdminMiddleware', () => {
    let req = {
        get: jest.fn().mockReturnValue('bearer token'),
    };
    const res: Response = {} as Response;
    const next: NextFunction = jest.fn();

    const mockUserModel = {
        findById: jest.fn(),
    };
    const mockAuthService = {
        decodeToken: jest.fn(),
        createToken: jest.fn(),
    } as AuthService;
    const adminMiddleware = new AdminMiddleware(
        mockUserModel as unknown as Model<iUser>,
        mockAuthService
    );
    describe('When use function is called with correct token', () => {
        test('Then it should call next without error', async () => {
            (mockAuthService.decodeToken as jest.Mock).mockReturnValueOnce({
                id: 'test',
            });
            (mockUserModel.findById as jest.Mock).mockResolvedValueOnce({
                role: 'admin',
            });
            await adminMiddleware.use(req as unknown as Request, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('When use function is called with incorrect token', () => {
        test('Then it should throw an exception', () => {
            (mockAuthService.decodeToken as jest.Mock).mockReturnValueOnce('');
            expect(() =>
                adminMiddleware.use(req as unknown as Request, res, next)
            ).rejects.toThrow();
        });
    });
    describe('When use function is called with expired token', () => {
        test('Then it should throw an exception', () => {
            (mockAuthService.decodeToken as jest.Mock).mockImplementationOnce(
                () => {
                    throw new Error();
                }
            );
            expect(() =>
                adminMiddleware.use(req as unknown as Request, res, next)
            ).rejects.toThrow();
        });
    });
    describe('When use function is called with a role:user user token', () => {
        test('Then it should throw an exception', () => {
            (mockAuthService.decodeToken as jest.Mock).mockReturnValueOnce({
                id: 'test',
            });
            (mockUserModel.findById as jest.Mock).mockResolvedValueOnce({
                role: 'user',
            });
            expect(() =>
                adminMiddleware.use(req as unknown as Request, res, next)
            ).rejects.toThrow();
        });
    });
    describe('When use function is called without token', () => {
        test('Then it should call throw an exception', async () => {
            req = {
                get: jest.fn().mockReturnValue(''),
            };
            expect(
                async () =>
                    await adminMiddleware.use(
                        req as unknown as Request,
                        res,
                        next
                    )
            ).rejects.toThrow();
        });
    });
});
