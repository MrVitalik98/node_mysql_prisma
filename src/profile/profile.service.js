import path from "path"
import { prisma } from "../app.js"
import { ApiError } from "../exceptions/api-error.js"
import profileRepository from "./profile.repository.js"
import { __dirname } from "../middlewares/file-upload.js"

class ProfileService {
    async getAllProfiles({ page=1, limit=10 }) {
        const skip = parseInt((page - 1) * limit)
        
        let [profiles, total] = await profileRepository.findAll([
            prisma.profile.findMany({ 
                select: { 
                    id: true,
                    avatar: true,
                    user: {
                        select: {
                            email: true,
                            firstname: true,
                            lastname: true,
                            gender: true,
                            created_at: true
                        }
                    },
                }, 
                orderBy: { 
                    user: { 
                        created_at: 'desc' 
                    } 
                },
                skip,
                take: parseInt(limit)
            }),
            prisma.profile.count()
        ])

        profiles = profiles.map(profile => {
            const baseUrl = path.resolve(__dirname, '..', 'public', 'images')
            
            if(profile.avatar) profile.avatar = `${baseUrl}/${profile.avatar}`

            return profile
        })
        
        return {profiles, total}
    }

    async getProfile(query) {
        const select = { 
            id: true,
            avatar: true,
            user: {
                select: {
                    email: true,
                    firstname: true,
                    lastname: true,
                    gender: true,
                    created_at: true
                }
            },
        }

        const profile = await profileRepository.findOne(query, select)
        return profile
    }

    async createNewProfile(userId) {
        await prisma.profile.create({ data: { userId } })
    }

    async editProfile(query, data) {
        const profile = await profileRepository.findOne(query, { userId: true })
        
        for(let [key, value] of Object.entries(data)) {
            if(!value) delete data[key]
        }

        if(!profile) {
            throw ApiError.BadRequestError('Profile does not exist')
        }

        await profileRepository.edit(query, data)

        return profile
    }

    // async delete(query) {
    //     const deletedProfile = await prisma.profile.delete({ where: query, select: { userId: true } })
    //     return deletedProfile
    // }
}

export default new ProfileService()