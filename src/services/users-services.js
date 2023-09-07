import {validate} from "../utils/validations.js";
import {registerUserValidation} from "../utils/validations/user-validations.js";
import bcrypt from 'bcrypt'
import {prisma} from "../utils/prisma.js";
import { v4 as uuidv4 } from "uuid";
import {ResponseError} from "../utils/errors/handler.js";
import jwt from 'jsonwebtoken';

const secret_key = process.env.SECRET_KEY;

const createToken = (payload) => {
    return jwt.sign({payload}, secret_key, { expiresIn: '1d'})
}

const register = async (request) => {
    // Validate Request Input
    const register = validate(registerUserValidation, request)

    // Check User in Database
    const countUserInDatabase = await prisma.user.count({
        where: {
            username: register.username
        }
    })

    if(countUserInDatabase === 1) {
        throw new ResponseError(400, 'username already exist')
    }

    // hashing password before save in database using bcrypt
    register.password = await bcrypt.hash(register.password, 8);
    register.id = uuidv4()

    return prisma.user.create({
        data: register,
        select: {
            username: true,
        }
    });
}

const login = async (request) => {
    // Validate user login
    const data = validate(registerUserValidation, request)

    // Check User in Database
    const user = await prisma.user.findUnique({
        where: {
            username: data.username
        }
    })

    if(!user) {
        throw new ResponseError(401, 'username or password is invalid!')
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if(!isValidPassword) {
        throw new ResponseError(401, 'username or password is invalid!')
    }

    const token = await createToken(user.id)

    return prisma.user.update({
        where: {
            username: user.username
        },
        data: {
            token: token
        },
        select: {
            token: true
        }
    })
}

export default  {
    register,
    login
}