import usersServices from "../services/users-services.js";


const register = async (req, res, next) => {
    try {
        const request = req.body;
        const data = await usersServices.register(request)
        res.json({
            data: data
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const request = req.body;
        const user = await usersServices.login(request)
        res.status(200).json({
            data: user
        })

    } catch (e) {
        next(e)
    }
}
export default {
    register,
    login
}