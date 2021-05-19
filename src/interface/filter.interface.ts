interface IFilterProvince {
  results: [
    provinces: {
      province_id?: number;
      province_name?: string;
      province_type?: string;
      id: number;
      value: string;
    },
  ];
}

interface IFilterDistrict {
  results: [
    district: {
      district_id?: number;
      district_name?: string;
      province_id?: number;
      lat?: null;
      lng?: null;
      district_type?: string;
      id: number;
      value: string;
    },
  ];
}

interface IFilterWard {
  results: [
    district: {
      ward_id?: number;
      ward_name?: string;
      district_id?: number;
      ward_type?: string;
      id: number;
      value: string;
    },
  ];
}

export { IFilterDistrict, IFilterProvince, IFilterWard };
