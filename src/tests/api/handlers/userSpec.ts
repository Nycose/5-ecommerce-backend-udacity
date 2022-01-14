// import app from '../../../app';
// import supertest from 'supertest';
// import { UserStore } from '../../../api/models/UserModel';

// const store = new UserStore();

// const request = supertest(app);
// describe('/users endpoint responses', () => {
//     it('response from index', async () => {
//         await store.create('Mason', 'Crawford', 'test', 'welcome', true);
//         const response = await request
//             .get('/users')
//             .set(
//                 'Authorization',
//                 'Bearer ' +
//                     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJDd1Ni44T1BVOVhuemMvdGJMd3FsV2VELjR6NXAzVnYyUTV5NnpSSlFweDFxZVpMUXBVNHB5In1dLCJpYXQiOjE2Mzc3Nzc5NzN9.T2NfZSRskZ7Ci-Ybe3moIx20ZrjfCgjcPaiPgKNnU3A'
//             );
//         expect(response.status).toBe(200);
//     });
//     it('response from show', async () => {
//         const response = await request
//             .get('/users/1')
//             .set(
//                 'Authorization',
//                 'Bearer ' +
//                     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJDd1Ni44T1BVOVhuemMvdGJMd3FsV2VELjR6NXAzVnYyUTV5NnpSSlFweDFxZVpMUXBVNHB5In1dLCJpYXQiOjE2Mzc3Nzc5NzN9.T2NfZSRskZ7Ci-Ybe3moIx20ZrjfCgjcPaiPgKNnU3A'
//             );
//         expect(response.status).toBe(200);
//     });
//     it('response from create', async () => {
//         const response = await request
//             .post('/users')
//             .set(
//                 'Authorization',
//                 'Bearer ' +
//                     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJDd1Ni44T1BVOVhuemMvdGJMd3FsV2VELjR6NXAzVnYyUTV5NnpSSlFweDFxZVpMUXBVNHB5In1dLCJpYXQiOjE2Mzc3Nzc5NzN9.T2NfZSRskZ7Ci-Ybe3moIx20ZrjfCgjcPaiPgKNnU3A'
//             );
//         expect(response.status).toBe(200);
//     });
// });
