import express from 'express';
import controller from '../controller/index.controller';

const userRouter = express.Router();

userRouter.post('/sign-up', controller.userController.signup);
userRouter.post('/login', controller.userController.login);
userRouter.put('/phone-confirm/:phone', controller.userController.confirmPhone);
userRouter.get('/get-user-info/:_id', controller.userController.getUserInfo);

export default userRouter;
