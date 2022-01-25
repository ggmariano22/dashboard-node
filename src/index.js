import 'dotenv/config';
import express from 'express';
import DashboardController from 'controllers/DashboardController';

const app = express();
const port = 3002;

app.use('/dashboard', DashboardController);

app.get('/', (req, res) => {
    return res.send('API v2');
})

app.listen(port, () => console.log(`Server started at localhost:${port}`));