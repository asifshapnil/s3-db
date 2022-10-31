const path = require('path');
const supertest = require('supertest');

const app = require(path.join(process.cwd(), 'src/config/lib/express'));

let request;

jest.setTimeout(20000);

beforeAll(async () => {
    const config = require(path.join(process.cwd(), 'src/config/config'));
    await config.initEnvironmentVariables();

    const appInstance = await app();
    request = supertest(appInstance);
});

describe('Core Routes', () => {
    it('Should return the home page.', async () => {
        const response = await request.get('/');

        expect(response.statusCode).toBe(200);
        expect(response.res.headers['content-type']).toMatch('text/html');
    });
});
