import express from 'express';
import userRouter from './user.routes';
import filterRouter from './filter.routes';

const router = express.Router();

router.use('/user', userRouter);
router.use('/filter', filterRouter);

export default router;
