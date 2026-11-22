import { app } from './app'
import { env } from './config/env';
import { connectDB } from "./config/database";
import cors from 'cors';


const port = env.port;

const startServer = async () => {
  await connectDB();
  app.use(cors());

  app.listen(port, (error) => {
    if (error) {
      if (error instanceof Error) {
        console.error("Error starting server:", error.message);
      }
      else {
        console.error("Error starting server:", error);
      }

    }
    else {
      console.log(`Server running on port ${port} popo`);
    }
  });
}

startServer();
