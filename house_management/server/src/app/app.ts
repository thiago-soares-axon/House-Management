import express from 'express';
import 'express-async-errors';
import AppDataSource from '../config/AppDataSource';
import router from '../routes/routes';
import { errorMiddleware } from '../middlewares/Errors/errors';

const PORT = process.env.SERVER_PORT;

AppDataSource.initialize()
    .then(() => {
        const app = express();

        app.use(express.json());

        app.use(router);


        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    })
    .catch((err) => console.error("Error connecting to the database:", err));
