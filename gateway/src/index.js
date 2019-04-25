import './env';
import Server from './server';

const port = process.env.PORT || 4003;
Server.express.listen(port, () =>
  // eslint-disable-next-line
  console.log(`🚀 Launched http://localhost:${port}/`),
);