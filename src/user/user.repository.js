import { prisma } from "../app.js"

class UserRepository {
    async findOne(query) {
       const user = await prisma.user.findUnique({ where: query })
       return user
    }

    async findFirst(query) {
        const user = await prisma.user.findFirst({ where: query })
        return user
     }

    async findAll() {
        const users = await prisma.user.findMany({ orderBy: { created_at: 'desc' }})
        return users
    }

    async create(data) {
        const newUser = await prisma.user.create({ data })
        return newUser
    }

    async edit(query, data) {
        await prisma.user.update({
            where: query,
            data
        })
    }

    async delete(query) {
        await prisma.user.delete({ where: query })
    }
}

export default new UserRepository()