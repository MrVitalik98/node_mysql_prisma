import { body } from "express-validator"

export const registerValidator = [
    body('firstname', 'The name must consist of at least 3 letters').isLength({ min: 3 }).trim(),
    body('email', 'Enter a valid email address').isEmail().normalizeEmail().trim(),
    body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }).trim()
]

export const loginValidator = [
    body('email', 'Enter your email address').isEmail().trim(),
    body('password', 'Enter password').isString().trim()
]

export const editValidator = [
    body('email', 'Enter a valid email address').isEmail().trim().optional(),
    body('firstname').trim().isLength({ min: 3 }).withMessage('The firstname must consist of at least 3 letters').optional(),
    body('lastname').trim().isLength({ min: 3 }).withMessage('The lastname must consist of at least 3 letters').optional(),
    body('gender', 'Enter gender').trim().isLength({ min: 3 }).optional()
];