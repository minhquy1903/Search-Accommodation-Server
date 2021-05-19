import { Response, Request } from 'express';
import axios from 'axios';

import {
  IFilterDistrict,
  IFilterProvince,
  IFilterWard,
} from '../interface/filter.interface';

const getAllProvince = async (req: Request, res: Response) => {
  try {
    const data: IFilterProvince = (
      await axios.get('https://vapi.vnappmob.com/api/province/')
    ).data;

    data.results.forEach((element, i) => {
      delete element.province_type;

      element.id = element.province_id!;
      delete element.province_id;

      element.value = element.province_name!;
      delete element.province_name;

      if (i < 5) element.value = element.value.slice(10, element.value.length);
      else element.value = element.value.slice(5, element.value.length);
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

      element.id = element.district_id!;
      delete element.district_id;

      element.value = element.district_name!;
      delete element.district_name;
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

      element.id = element.ward_id!;
      delete element.ward_id;

      element.value = element.ward_name!;
      delete element.ward_name;
    });
    const filterWard = data.results;

    res.status(200).json({ data: filterWard });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

export default { getAllProvince, getDistrictOfProvince, getWardOfDistrict };
