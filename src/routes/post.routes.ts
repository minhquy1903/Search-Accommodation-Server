import express from 'express';
import controller from '../controller/index.controller';
import auth from '../middleware/auth';
const postRouter = express.Router();

// postRouter.use(auth);

postRouter.get('/', (req, res) => {
  res.json({ result: 'hello middleware' });
});
postRouter.post('/create-post', controller.postController.createPost);
postRouter.get(
  '/get-post-detail/:_id',
  controller.postController.getPostDetail,
);
postRouter.get('/filter-post', controller.postController.filterPost);
postRouter.get('/get-hot-post', controller.postController.getHotPosts);
postRouter.get(
  '/get-post-page/:page',
  controller.postController.getPostsOfPage,
);
postRouter.get('/count-posts', controller.postController.countPosts);

export default postRouter;
