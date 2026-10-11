import express, {Application, Request, Response, Router} from "express" ;
import artRoutes from "./routes/arts";
import { connectDB } from "./config/database";

const PORT = process.env.PORT || 3000;

const app: Application = express();

const startServer = async () => {
  await connectDB();
}

startServer()
app.use(express.json());
app.use('/api/v1/arts', artRoutes);

app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello chudik"
    });
});




app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    });

app.use((req, _res, next) => {  
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});


export { app };