import { prisma } from "../app.js"

class ProfileRepository {
    findAll(query) {        
        return Promise.all(query)
    }

    findOne(query, select = {}) {
        return prisma.profile.findUnique({ where: query, select })
    }

    create(data) {
        return prisma.profile.create({ data })
    }

    edit(query, data) {
        return prisma.profile.update({
            where: query,
            data
        })
    }

    delete(query) {
        return prisma.profile.delete({ where: query })
    }
}

export default new ProfileRepository()