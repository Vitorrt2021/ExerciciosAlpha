import config from './config/index';
import app from './app';

const port = config.port;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});