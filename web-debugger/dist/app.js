"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.app = express_1.default();
        this.app.use(express_1.default.json());
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express_1.default.Router();
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
            res.json({ message: 'ok' });
        });
        this.app.use('/', router);
    }
}
var app = new App().app;
exports.default = app;
//# sourceMappingURL=app.js.map