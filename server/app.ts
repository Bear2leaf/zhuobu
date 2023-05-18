import express, { Request, Response } from 'express';
import {generate, talk} from './api.js';

const app = express()
app.use(express.json());

const port = 3100

app.use('/', express.static('../dist'));
app.use('/webcomponent', express.static('./dist/webcomponent'));
app.use('/resource', express.static('../resource'));
app.use('/static', express.static('../static'));


app.post('/generate', async (req: Request, res: Response) => {
    try {
        await generate(req, res);
    } catch (error) {
        console.error(error);
        res.send({ error });
    }
});
app.post('/talk', async (req: Request, res: Response) => {
    try {
        await talk(req, res);
    } catch (error) {
        console.error(error);
        res.send({ error });
    }
});

app.listen(port, 'localhost', () => {
  console.log(`Example app listening on port ${port}`)
})