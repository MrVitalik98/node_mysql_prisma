import { validationResult } from "express-validator"
import profileService from "./profile.service.js"
import { ApiError } from "../exceptions/api-error.js"
import userService from "../user/user.service.js"
import { deleteFile } from "../utils/file.js"

class ProfileController {
    async getProfileList(req, res, next) {
        try {
            const { page, limit } = req.query
            const result = await profileService.getAllProfiles({ page, limit })
            return res.status(200).json(result)
        }
        catch(e) {
            next(e)
        }
    }

    async getProfile(req, res, next) {
        try {
            const { profileId } = req.params
            const profile = await profileService.getProfile({ id: parseInt(profileId) })
            return res.status(200).json({ profile })
        } 
        catch(e) {
            next(e)
        }
    }

    async editProfile(req, res, next) {
        const errors = validationResult(req)
        const { profileId } = req.params
        const { filename: avatar = '' } = req.file ?? {}

        if(!errors.isEmpty()) {
            await deleteFile(avatar)
            return next(ApiError.BadRequestError('Validation Error', errors.array()))
        }
        
        try {
            const profile = await profileService.editProfile({ id: parseInt(profileId) }, { avatar })
            await userService.editUser({ id: profile.userId }, req.body)
            
            return res.status(200).json({ msg: 'User profile data has been successfully changed'})
        }
        catch(e) {
            await deleteFile(avatar)
            next(e)
        }
    }

    // async deleteProfile(req, res, next) {
    //     try {
    //         const { profileId } = req.params
    //         const profile = await profileService.findOne({ id: parseInt(profileId) })

    //         if(!profile) return next(ApiError.BadRequestError('Profile not found'))

    //         const deletedProfile = await profileService.delete({ id: profile.id })

    //         await userService.delete({ id: deletedProfile.userId })

    //         return res.status(200).json({ message: 'Profile deleted successfully'})
    //     }
    //     catch(e) {
    //         next(e)
    //     }
    // }
}

export default new ProfileController()