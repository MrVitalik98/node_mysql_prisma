import { Router } from "express"
import UserController from "./user.controller.js"
import { loginValidator, registerValidator } from "../utils/validation.js"

const router = Router()

// =====================================================
// ====================== Login ========================
// =====================================================
router.post('/login', loginValidator, UserController.login)

// ======================================================
// ==================== Register ========================
// ======================================================
router.post('/register', registerValidator, UserController.register)

export default router