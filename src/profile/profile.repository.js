import { prisma } from "../app.js"

class ProfileRepository {
    async findAll(query) {        
        const result = await Promise.all(query)
        return result
    }

    async findOne(query, select = {}) {
        const profile = await prisma.profile.findUnique({ where: query, select })
        return profile
    }

    async create(data) {
        await prisma.profile.create({ data })
    }

    async edit(query, data) {
        await prisma.profile.update({
            where: query,
            data
        })
    }

    // async delete(query) {
    //     const deletedProfile = await prisma.profile.delete({ where: query, select: { userId: true } })
    //     return deletedProfile
    // }
}

export default new ProfileRepository()