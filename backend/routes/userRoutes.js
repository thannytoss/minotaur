import express from 'express';
import {authUser,
    regUser,
    logoutUser,
    getUserProfile,
    updateUserProfile} from "../controllers/userController.js";
import { createExercise,
    updateUserExercise,} from "../controllers/exerciseController.js";
const router = express.Router();
import { protectRoutes } from '../middleware/authMiddleware.js';

router.post('/', regUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protectRoutes, getUserProfile).put(protectRoutes, updateUserProfile);
router.route('/exercise').post(protectRoutes, createExercise).put(protectRoutes, updateUserExercise);




export default router;