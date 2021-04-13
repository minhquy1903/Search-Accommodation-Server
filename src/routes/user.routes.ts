import express from 'express';
import controller from '../controller/index.controller';

const useRouter = express.Router();

useRouter.post('/sign-up', controller.userController.signup);
useRouter.post('/login', controller.userController.login);

export default useRouter;
