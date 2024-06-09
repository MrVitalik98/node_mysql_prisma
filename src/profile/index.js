import { Router } from "express"
import ProfileController from "./profile.controller.js"
import { fileUpload } from "../middlewares/file-upload.js"
import { editValidator } from "../utils/validation.js"

const router = Router()

// ===================================================================
// ======================== Get All Users ============================
// ===================================================================
router.get('/profiles', ProfileController.getProfileList)

// ===================================================================
// ======================== Get User By ID ===========================
// ===================================================================
router.get('/profile/:profileId', ProfileController.getProfile)

// ===================================================================
// ======================== Edit User By ID ==========================
// ===================================================================
router.put('/profile/:profileId', fileUpload.single('avatar'), editValidator, ProfileController.editProfile)

// ===================================================================
// ================= Delete User Profile By ID =======================
// ===================================================================
// router.delete('/profile/:profileId', ProfileController.deleteProfile)

export default router