import express from 'express'
import {apiRoute} from "../routes/api.js";
import {errorMiddleware} from "../middlewares/errors-middleware.js";


export const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome to Express Auth'
    })
})

app.use(apiRoute)



app.use(errorMiddleware)