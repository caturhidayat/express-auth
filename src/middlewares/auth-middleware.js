import jwt from "jsonwebtoken";
import {prisma} from "../utils/prisma.js";


const sercet_key = process.env.SECRET_KEY;

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');

    if(!token) {
        res.status(401).json({
            error: 'Unauthorized'
        }).end()
    } 

    try {
        const verifyToken = await jwt.verify(token, sercet_key)
        const user = await prisma.user.findFirst({
            where: {
                id: verifyToken.payload
            },
            select: {
                id: true,
                username: true
            }
        })
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({
            error: 'Unauthorized'
        })
    }
    
}