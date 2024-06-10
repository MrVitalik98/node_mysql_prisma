import { prisma } from "../app.js"

class UserRepository {
    findOne(query) {
       return prisma.user.findUnique({ where: query })
    }

    findFirst(query) {
        return prisma.user.findFirst({ where: query })
     }

    findAll() {
        return prisma.user.findMany({ orderBy: { created_at: 'desc' }})
    }

    create(data) {
        return prisma.user.create({ data })
    }

    edit(query, data) {
        return prisma.user.update({
            where: query,
            data
        })
    }

    delete(query) {
        return prisma.user.delete({ where: query })
    }
}

export default new UserRepository()