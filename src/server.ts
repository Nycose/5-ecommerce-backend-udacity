import app from './app';

const address = 'http://localhost:3000/';
const PORT = 3000;

app.listen(PORT, function () {
    console.log(`** Server is listening on ${address} **`);
});
