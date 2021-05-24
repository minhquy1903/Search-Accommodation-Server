import express from 'express';
import controller from '../controller/index.controller';
import auth from '../middleware/auth';
const postRouter = express.Router();

// postRouter.use(auth);

postRouter.get('/', (req, res) => {
  res.json({ result: 'hello middleware' });
});

postRouter.post('/create-post', controller.postController.createPost);

postRouter.get('/get-post/:_id', controller.postController.getPostDetail);

postRouter.post('/filter-posts/:page', controller.postController.filterPost);

postRouter.post('/count-posts', controller.postController.countPosts);

postRouter.put('/update-post/:_id', controller.postController.updatePost);

export default postRouter;
