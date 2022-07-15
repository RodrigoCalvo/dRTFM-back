import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateDocumentDto } from '../document/dto/create-document.dto';

describe('Given the routes /users', () => {
    let app: INestApplication;

    let user1Id: string;
    let user1Token: string;
    let user2Token: string;
    let document1Id: string;
    let document2Id: string;

    const mockUser1: CreateUserDto = {
        name: 'test',
        email: 'test1@test.com',
        password: '1234',
        photo: 'none',
        myDocuments: [],
        myFavs: [],
    };
    const mockUser2: CreateUserDto = {
        name: 'test',
        email: 'test2@test.com',
        password: '1234',
        photo: 'none',
        myDocuments: [],
        myFavs: [],
    };
    const mockDocument: CreateDocumentDto = {
        title: 'test',
        content: [
            { text: 'text', options: [{ key: 'test key', value: 'test' }] },
        ],
        keywords: ['test keyword'],
        author: '',
        visibility: 'public',
    };
    const query = 'test';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        let response: request.Response;

        //user1 signs in
        response = await request(app.getHttpServer())
            .post('/user')
            .send(mockUser1)
            .set('Accept', 'application/json');
        user1Id = response.body.user._id;
        user1Token = response.body.token;

        //user2 signs in
        response = await request(app.getHttpServer())
            .post('/user')
            .send(mockUser2)
            .set('Accept', 'application/json');
        user2Token = response.body.token;
    });

    afterAll(async () => {
        //user1 removes themself
        await request(app.getHttpServer())
            .delete('/user/')
            .set('Authorization', 'bearer ' + user1Token);

        //user2 removes themself
        await request(app.getHttpServer())
            .delete('/user/')
            .set('Authorization', 'bearer ' + user2Token);

        await app.close();
    });

    test('/document (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/document')
            .send({ ...mockDocument, author: user1Id })
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(201);
        document1Id = response.body._id;
    });

    //fork
    test('/document/:id (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/document/' + document1Id)
            .set('Authorization', 'bearer ' + user2Token);
        expect(response.status).toBe(201);
        document2Id = response.body._id;
    });

    test('/document/ (GET)', async () => {
        const response = await request(app.getHttpServer()).get('/document/');
        expect(response.status).toBe(200);
    });

    test('/document/:id (GET)', async () => {
        const response = await request(app.getHttpServer()).get(
            '/document/' + document1Id
        );
        expect(response.status).toBe(200);
    });

    test('/document/search (GET)', async () => {
        const response = await request(app.getHttpServer()).get(
            '/document/search?query=' + query
        );
        expect(response.status).toBe(200);
    });

    test('/document/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch('/document/' + document1Id)
            .send({ title: 'updated test' })
            .set('Authorization', 'bearer ' + user1Token);
        // expect(response).toBe(200);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('updated test');
    });

    test('/document/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete('/document/' + document1Id)
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(200);
    });

    test('/document/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete('/document/' + document2Id)
            .set('Authorization', 'bearer ' + user2Token);
        expect(response.status).toBe(200);
    });
});
