import * as authController from '../controllers/authController.js';
import {Router} from 'express';

const router = Router();

// Register user
router.post('/register', authController.registerUser);

// Login user
router.post('/login', authController.loginUser);

export default router;