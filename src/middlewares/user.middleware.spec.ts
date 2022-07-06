import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { iDocument } from 'src/document/entities/document.entity';
import { AuthService } from '../auth/auth.service';
import { UserMiddleware } from './user.middleware';

describe('Given UserMiddleware', () => {
    let req = {
        params: { id: 'docId' },
        get: jest
            .fn()
            .mockReturnValue(
                'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzNmMmEwNTI4NzA4N2JlYzE3YTNkYSIsImlhdCI6MTY1NzEwMTA4MCwiZXhwIjoxNjU3MTA0NjgwfQ.6GifQcJgGtzFZCgebeooLnPdqCddrS4ciOwZMR8NGT4'
            ),
    };
    const res: Response = {} as Response;
    const next: NextFunction = jest.fn();

    const mockDocumentModel = {
        findById: jest.fn(),
    };
    const mockAuthService = {
        decodeToken: jest.fn(),
        createToken: jest.fn(),
    } as AuthService;
    const userMiddleware = new UserMiddleware(
        mockDocumentModel as unknown as Model<iDocument>,
        mockAuthService
    );
    describe('When use function is called with correct token', () => {
        test('Then it should call next without error', async () => {
            (mockAuthService.decodeToken as jest.Mock).mockReturnValueOnce({
                id: 'test1',
            });
            (mockDocumentModel.findById as jest.Mock).mockResolvedValueOnce({
                author: { toString: () => 'test1' },
            });
            await userMiddleware.use(req as unknown as Request, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When use function is called with incorrect token', () => {
        test('Then it should throw an exception', () => {
            (mockAuthService.decodeToken as jest.Mock).mockReturnValueOnce('');
            expect(() =>
                userMiddleware.use(req as unknown as Request, res, next)
            ).rejects.toThrow();
        });
    });
    describe('When use function is called with non valid documentId', () => {
        test('Then it should throw an exception', () => {
            (mockAuthService.decodeToken as jest.Mock).mockReturnValueOnce({
                id: 'test1',
            });
            (mockDocumentModel.findById as jest.Mock).mockResolvedValueOnce(
                null
            );
            expect(() =>
                userMiddleware.use(req as unknown as Request, res, next)
            ).rejects.toThrow();
        });
    });
    describe('When use function is called with valid documentId and correct token but author and user dont match', () => {
        test('Then it should throw an exception', () => {
            (mockAuthService.decodeToken as jest.Mock).mockReturnValueOnce({
                id: 'test1',
            });
            (mockDocumentModel.findById as jest.Mock).mockResolvedValueOnce({
                author: { toString: () => 'test2' },
            });
            expect(() =>
                userMiddleware.use(req as unknown as Request, res, next)
            ).rejects.toThrow();
        });
    });
    describe('When use function is called without token', () => {
        test('Then it should call throw an exception', async () => {
            req = {
                params: { id: 'docId' },
                get: jest.fn().mockReturnValue(''),
            };
            expect(
                async () =>
                    await userMiddleware.use(
                        req as unknown as Request,
                        res,
                        next
                    )
            ).rejects.toThrow();
        });
    });
});
