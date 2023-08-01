import express from 'express';
import {authUser,
    regUser,
    logoutUser,
    getUserProfile,
    updateUserProfile} from "../controllers/userController.js";
const router = express.Router();
import { protectRoutes } from '../middleware/authMiddleware.js';

router.post('/', regUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protectRoutes, getUserProfile).put(protectRoutes, updateUserProfile);





export default router;