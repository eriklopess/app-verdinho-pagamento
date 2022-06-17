import { Request, Response, Router } from 'express';

const homeRouter = Router();

homeRouter.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Seja bem vindo!</h1>
  <h2>Feito por Erik Lopes</h2>
  <h2>Repositório do projeto:</h2>
  <a href="https://github.com/eriklopess/app-verdinho-pagamento">GitHub</a>`);
});

export default homeRouter;
