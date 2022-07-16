import { LoadDB } from './loadDB';
import { iDocument } from '../document/entities/document.entity';
import { iUser } from '../user/entities/user.entity';
import { Model } from 'mongoose';

describe('Given loadDB class', () => {
    const mockUserModel = { findByIdAndUpdate: jest.fn() };
    const mockDocumentModel = {
        insertMany: jest.fn().mockResolvedValue([{ _id: 'test' }]),
    };
    const myLoadDB = new LoadDB(
        mockDocumentModel as unknown as Model<iDocument>,
        mockUserModel as unknown as Model<iUser>
    );
    describe('When call load method', () => {
        test('It should return false', async () => {
            const result = await myLoadDB.load(true);
            expect(result).toBeTruthy();
        });
    });
});
