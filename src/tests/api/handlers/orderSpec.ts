// import app from '../../../app';
// import supertest from 'supertest';
// import { UserStore } from '../../../api/models/UserModel';
// import { ProductStore } from '../../../api/models/ProductModel';
// import { OrderStore } from '../../../api/models/OrderModel';

// const products = new ProductStore();
// const users = new UserStore();
// const orders = new OrderStore();

// const request = supertest(app);
// describe('/orders endpoint responses', () => {
//     it('response from show', async () => {
//         await users.create('Mason', 'Crawford', 'test', 'welcome', true);
//         const response = await request
//             .get('/orders/1')
//             .set('Accept', 'application/json')
//             .set(
//                 'Authorization',
//                 'Bearer ' +
//                     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJDd1Ni44T1BVOVhuemMvdGJMd3FsV2VELjR6NXAzVnYyUTV5NnpSSlFweDFxZVpMUXBVNHB5In1dLCJpYXQiOjE2Mzc3Nzc5NzN9.T2NfZSRskZ7Ci-Ybe3moIx20ZrjfCgjcPaiPgKNnU3A'
//             );
//         expect(response.status).toBe(200);
//     });
//     it('response from currentOrderByUser', async () => {
//         const response = await request.get('/orders/users/1');
//         expect(response.status).toBe(200);
//     });
//     it('response from addProduct', async () => {
//         await products.create({
//             name: 'test',
//             price: 5,
//             description: 'test',
//             image: 'test',
//             category: 1,
//         });
//         await orders.create({ status: 'open', user_id: 1 });
//         const response = await request
//             .post('/orders/1/products')
//             .send({ productId: 1, quantity: 1 });
//         expect(response.status).toBe(200);
//     });
// });
