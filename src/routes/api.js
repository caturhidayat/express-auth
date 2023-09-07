import express from 'express';
import usersControllers from "../controllers/users-controllers.js";
import {authMiddleware} from "../middlewares/auth-middleware.js";

const apiRoute = express.Router()

apiRoute.post('/users/register', usersControllers.register);
apiRoute.post('/users/login', usersControllers.login);

// Auth Middleware
apiRoute.use(authMiddleware)
apiRoute.get('/token', (req, res, next)=> {
    res.json({
        message: 'Auth Success'
    })
})

export {
    apiRoute
}





