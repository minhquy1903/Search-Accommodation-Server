import express from 'express';
import userRouter from './user.routes';
import filterRouter from './filter.routes';
import postRouter from './post.routes';
const router = express.Router();

router.use('/user', userRouter);
router.use('/filter', filterRouter);
router.use('/post', postRouter);
export default router;
