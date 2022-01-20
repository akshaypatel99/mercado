import { port } from './config/environment';
import app from './app';
import connectDB from './db/db';

connectDB();

// app.get('/', (req, res) => {
//     console.log("Apollo GraphQL Express server is ready");
// });

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`🚀  GraphQL Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.log('Not able to run GraphQL server');
    }
};

start();

