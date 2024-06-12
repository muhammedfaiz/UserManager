import express from 'express';
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
const   router=express.Router();

router.post('/',upload.single('image'),registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,upload.single('image'),updateUserProfile);


export default router;