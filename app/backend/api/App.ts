import express from 'express';
import routes from '../routes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private middleware(): void {
    this.app.use(express.json());
  }

  private config(): void {
    this.middleware();
    this.headers();
    this.router();
  }

  private headers(): void {
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      next();
    });
  }

  private router(): void {
    this.app.use(routes);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`Server on port ${PORT}`);
    });
  }
}

export default App;
