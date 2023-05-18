import express, { Request, Response } from 'express';
import generate from './generate.js';

const app = express()
app.use(express.json());

const port = 3100

app.use('/', express.static('../dist'));
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})