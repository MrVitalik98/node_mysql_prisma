import { validationResult } from "express-validator"
import { ApiError } from "../exceptions/api-error.js"
import userService from "./user.service.js"
import profileService from "../profile/profile.service.js"

const cookieConf = {
    maxAge: 60 * 60 * 1000 * 24 * 90,   // 90 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
}

class UserController {
    async login(req, res, next) {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            next(ApiError.BadRequestError('Validation Error', errors.array()))
        }

        try {
            const result = await userService.login(req.body)

            res.cookie('refreshToken', result.refreshToken, cookieConf)

            delete result.refreshToken

            return res.status(200).json(result)
        }
        catch(e) {
            next(e)
        }
    }

    async register(req, res, next) {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            next(ApiError.BadRequestError('Validation Error', errors.array()))
        }

        try {
            await userService.register(req.body)
            return res.status(201).json({ message: 'Registration completed successfully' })
        }
        catch(e) {
            next(e)
        }
    }
}

export default new UserController()