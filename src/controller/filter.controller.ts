import { Response, Request } from 'express';
import axios from 'axios';

import {
  IFilterDistrict,
  IFilterProvince,
  IFilterWard,
} from '../interface/filterPro.interface';

const getAllProvince = async (req: Request, res: Response) => {
  try {
    const data: IFilterProvince = (
      await axios.get('https://vapi.vnappmob.com/api/province/')
    ).data;

    data.results.forEach((element, i) => {
      delete element.province_type;

      if (i < 5)
        element.province_name = element.province_name.slice(
          10,
          element.province_name.length,
        );
      else
        element.province_name = element.province_name.slice(
          5,
          element.province_name.length,
        );
    });
    const filterProvince = data.results;

    res.status(200).json({ data: filterProvince });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

const getDistrictOfProvince = async (req: Request, res: Response) => {
  try {
    const provinceID = req.params._id;

    const data: IFilterDistrict = (
      await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${provinceID}`,
      )
    ).data;

    data.results.forEach((element, i) => {
      delete element.district_type;
      delete element.lat;
      delete element.lng;
    });
    const filterDistrict = data.results;

    res.status(200).json({ data: filterDistrict });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

const getWardOfDistrict = async (req: Request, res: Response) => {
  try {
    const wardID: number = parseInt(req.params._id);

    const data: IFilterWard = (
      await axios.get(`https://vapi.vnappmob.com/api/province/ward/${wardID}`)
    ).data;

    data.results.forEach((element, i) => {
      delete element.ward_type;
    });
    const filterWard = data.results;

    res.status(200).json({ data: filterWard });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

export default { getAllProvince, getDistrictOfProvince, getWardOfDistrict };
