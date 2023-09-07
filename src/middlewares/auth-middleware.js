import jwt from "jsonwebtoken";
import {prisma} from "../utils/prisma.js";


const sercet_key = process.env.SECRET_KEY;

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');

    if(!token) {
        res.status(401).json({
            error: 'Unauthorized'
        }).end()
    } else {
    const verifyToken = await jwt.verify(token, sercet_key)
        console.log(verifyToken)
        const user = await prisma.user.findFirst({
            where: {
                id: verifyToken.payload
            },
            select: {
                id: true,
                username: true
            }
        })
        if(!user) {
            res.status(401).json({
                error: 'Unauthorized'
            })
        } else {
            req.user = user
            next()
        }
    }
}