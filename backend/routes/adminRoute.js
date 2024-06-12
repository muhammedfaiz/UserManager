import express from 'express';
import { dashboard, editUser, getUser, removeUser } from '../controllers/adminController.js';
import { upload } from '../middleware/uploadMiddleware.js';
const router =  express.Router();

router.get('/',dashboard);
router.get('/remove-user/:id',removeUser);
router.route('/edit-user/:id').get(getUser).put(upload.single('image'),editUser);

export default router;