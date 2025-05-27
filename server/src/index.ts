import express from 'express';
import { HelloRouteur } from './routes/hello.router';

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  process.stdout.write(`Server started on port: ${port}\n`);
});

app.use('/hello', HelloRouteur);