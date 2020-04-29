import express from "express";

class App {
    public app: express.Application;

    constructor () {
        this.app = express();
        this.app.use(express.json());
        this.mountRoutes();
    }

    private mountRoutes (): void {
        const router = express.Router();
        router.get('*', (req, res) => {
            console.log({
                url: req.url,
                qs: req.query,
                body: req.body
            });
            res.json({
                qs: req.query,
                url: req.url,
                messsage: "ok"
            });
        });
        router.post('*', (req, res) => {
            console.log({
                url: req.url,
                qs: req.query,
                body: req.body
            });
            res.json({message:'ok'});
        });
        this.app.use('/', router);
    }
}

var app = new App().app;
export default app;