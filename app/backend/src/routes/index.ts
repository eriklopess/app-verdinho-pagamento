import { Router } from 'express';

const route = Router().get('/', (req, res) => {
    res.send('Hello World!');
}
);

const routes: Router[] = [route];

export default routes;
