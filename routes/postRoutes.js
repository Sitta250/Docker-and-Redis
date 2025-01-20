import express from 'express'
import postController from '../controller/postController.js'
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route("/")
  .get(protect,postController.getAllPost)
  .post(protect, postController.createPost)

router
  .route("/:id")
  .get(protect, postController.getOnePost)
  .put(protect, postController.updatePost)
  .delete(protect, postController.deletePost)

export default router;