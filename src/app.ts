import express, {Application, Request, Response} from "express" ;
import artRoutes from "./routes/arts";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./config/swagger";

const app: Application = express();

app.use(express.json());
app.use('/api/v1/arts', artRoutes);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello chudik"
    });
});


app.use((req, _res, next) => {  
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});


export { app };