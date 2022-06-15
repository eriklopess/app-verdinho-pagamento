import App from './App';
import 'dotenv/config';

const server = new App();

server.start(Number(process.env.PORT));
