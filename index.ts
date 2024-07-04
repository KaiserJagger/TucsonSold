import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

// Define routes
app.get('/', (req: Request, res: Response) => {
    res.send('APP Express + TS + Nodemon + Swagger + Mongoose');
});

app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello world');
});


app.listen(port, () => {
     console.log(`EXPRESS SERVER: Running at http://localhost:${port}`)
});
