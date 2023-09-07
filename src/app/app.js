import express from 'express'
import {apiRoute} from "../routes/api.js";
import {errorMiddleware} from "../middlewares/errors-middleware.js";


export const app = express();

app.use(express.json());

app.use(apiRoute)



app.use(errorMiddleware)