import jwt from "jsonwebtoken"

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15m' })
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '90d'})

        return { accessToken, refreshToken }
    }

    validAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
            return userData
        }
        catch(e) {
            return null
        }
    }

    validRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY)
            return userData
        }
        catch(e) {
            return null
        }
    } 
}

export default new TokenService()