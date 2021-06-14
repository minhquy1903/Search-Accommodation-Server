import express from 'express';
import controller from '../controller/index.controller';

const userRouter = express.Router();

userRouter
    .post('/sign-up', controller.userController.signup)
    .post('/login', controller.userController.login)
    .put('/phone-confirm/:phone', controller.userController.confirmPhone)
    .get('/get-user-info/:_id', controller.userController.getUserInfo)
    .put('/update', controller.userController.updateUserInformation)

export default userRouter;
