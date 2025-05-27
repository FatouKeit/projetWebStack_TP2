import express from 'express';
import { HelloRouteur } from './routes/hello.router';

const app = express();
const port = process.env.PORT || 3000;

const path = require("path");

const DIST_DIR = path.join(__dirname, "../../client/dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

app.listen(port, () => {
  process.stdout.write(`Server started on port: ${port}\n`);
});

app.get('/', (_req, res) => {
    res.sendFile(HTML_FILE);
  });

app.use(express.static(DIST_DIR));
app.use('/hello', HelloRouteur);