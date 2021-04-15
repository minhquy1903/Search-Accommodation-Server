import express from 'express';
import controller from '../controller/index.controller';
const filterRouter = express.Router();

filterRouter.get('/province', controller.filterController.getAllProvince);
filterRouter.get(
  '/district/:_id',
  controller.filterController.getDistrictOfProvince,
);
filterRouter.get('/ward/:_id', controller.filterController.getWardOfDistrict);

export default filterRouter;
