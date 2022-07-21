/* istanbul ignore file */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateUserDto } from '../user/dto/create-user.dto';

describe('Given the routes /users', () => {
    let app: INestApplication;

    let userId: string;
    let userToken: string;

    const mockUser1: CreateUserDto = {
        name: 'test',
        email: 'test@test.com',
        password: '1234',
        photo: 'none',
        myDocuments: [],
        myFavs: [],
    };
    const mockUser2: CreateUserDto = {
        name: 'test',
        email: 'admin@test.com',
        password: '1234',
        photo: 'none',
        myDocuments: [],
        myFavs: [],
        role: 'admin',
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    test('/user (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/user')
            .send(mockUser1)
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
    });

    test('/user (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/user')
            .send(mockUser2)
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
    });

    test('/user/login (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/user/login')
            .send({
                email: 'test@test.com',
                password: '1234',
            })
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        userId = response.body.user._id;
        userToken = response.body.token;
    });

    test('/user (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/user')
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
    });

    test('/user/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/user/' + userId)
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
    });

    test('/user/ (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch('/user/')
            .send({ name: 'updated test' })
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('updated test');
    });

    //admin logs in
    test('/user/login (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/user/login')
            .send({
                email: 'admin@test.com',
                password: '1234',
            })
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        userToken = response.body.token;
    });

    //admin removes user
    test('/user/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete('/user/' + userId)
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
    });

    //admin removes themself
    test('/user/ (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete('/user/')
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
    });
});
