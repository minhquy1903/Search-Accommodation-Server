import express from 'express';
import controller from '../controller/index.controller';

const userRouter = express.Router();

userRouter.post('/sign-up', controller.userController.signup);
userRouter.post('/login', controller.userController.login);
userRouter.put('/phone-confirm/:phone', controller.userController.confirmPhone);

export default userRouter;
