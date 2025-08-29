import BindOrdersRoute from './routes/orders';
import BindProductsRoute from './routes/products';
import type { Express } from 'express';

export default function BindExpress(app: Express) {
    const port = process.env.PORT;

    app.get('/', (_, res) => {
        res.send('Projeto 1 - Arquitetura de Sistemas');
    });

    BindProductsRoute(app)
    BindOrdersRoute(app)

    app.listen(port, () => {
        return console.log(`Express listening on http://localhost:${port}`);
    });
}
