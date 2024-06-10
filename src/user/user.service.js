import bcrypt from "bcrypt"
import userRepository from "./user.repository.js"
import { ApiError } from "../exceptions/api-error.js"
import tokenService from "../services/token.service.js"
import profileService from "../profile/profile.service.js"

class UserService {
    async login(body) {
        const { email, password } = body

        const candidate = await userRepository.findOne({ email })

        if(!candidate) throw ApiError.BadRequestError('Email address or password is invalid')

        const isMatch = await bcrypt.compare(password, candidate.password)

        if(!isMatch) throw ApiError.BadRequestError('Email address or password is invalid')

        const payload = {
            sub: candidate.id,
            email: candidate.email
        }

        const { accessToken, refreshToken } = tokenService.generateTokens(payload)

        const user = {
            email: candidate.email,
            firstname: candidate.firstname,
            lastname: candidate.lastname,
        }

        return { user, accessToken, refreshToken }
    }

    async register(body) {
        const { email, firstname, password } = body

        const isExists = await userRepository.findOne({ email })

        if(isExists) throw ApiError.BadRequestError('A user with this email address already exists')

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        await profileService.createNewProfile({
            email,
            firstname,
            password: hashedPassword
        })
    }

    async editUser(query, data) {
        const { email, firstname, lastname, gender } = data

        const user = await userRepository.findOne(query)

        if(!user) throw ApiError.BadRequestError('User does not exist')

        if(email) {
            const candidate = await userRepository.findFirst({
                id: { not: user.id },
                email
            })
    
            if(candidate) throw ApiError.BadRequestError('Email already in use')    
        }
        
        await userRepository.edit(query, { email, firstname, lastname, gender })
    }
}

export default new UserService()